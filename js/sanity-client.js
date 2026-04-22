/**
 * Configuration du client Sanity pour BLUECOM
 */
const SANITY_PROJECT_ID = '0x8v5gxj';
const SANITY_DATASET = 'production';

/**
 * Fonction pour construire l'URL de l'image Sanity
 */
function urlFor(source) {
    if (!source) {
        console.log('urlFor: source is null/undefined');
        return '';
    }
    
    // Si c'est une chaîne directe (URL déjà formée)
    if (typeof source === 'string') {
        console.log('urlFor: source is string:', source);
        return source;
    }
    
    // Si l'image a un asset avec url directement
    if (source.asset && source.asset.url) {
        console.log('urlFor: got asset URL:', source.asset.url);
        return source.asset.url;
    }
    
    // Si on a une _ref
    if (source.asset && source.asset._ref) {
        const ref = source.asset._ref;
        // Format: image-abc123-def456-w200h200.jpg
        const parts = ref.split('-');
        if (parts.length >= 2) {
            const id = parts[1];
            // Different formats depending on the image size requested
            const dimensions = parts.slice(2).join('-').replace(/\.[^.]+$/, '');
            const url = `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dimensions}`;
            console.log('urlFor: constructed URL:', url);
            return url;
        }
    }
    
    console.log('urlFor: no valid image found in source', source);
    return '';
}

/**
 * Fetch des articles pour la page liste (blog.html)
 */
async function fetchAllPosts() {
    const query = encodeURIComponent(`*[_type == "post"] | order(publishedAt desc) {
        title,
        slug,
        category,
        publishedAt,
        mainImage,
        excerpt
    }`);
    const url = `https://0x8v5gxj.api.sanity.io/v2024-03-01/data/query/production?query=${query}`;
    
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log("Sanity fetchAllPosts result:", result);
        return result.result;
    } catch (error) {
        console.error("Erreur Sanity:", error);
        return [];
    }
}

/**
 * Fetch d'un article spécifique (blog-post.html)
 */
async function fetchPostBySlug(slug) {
    const query = encodeURIComponent(`*[_type == "post" && slug.current == "${slug}"][0]`);
    const url = `https://0x8v5gxj.api.sanity.io/v2024-03-01/data/query/production?query=${query}`;
    
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log("Sanity fetchPostBySlug result:", result);
        return result.result;
    } catch (error) {
        console.error("Erreur Sanity single post:", error);
        return null;
    }
}
