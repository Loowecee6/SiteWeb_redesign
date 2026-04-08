/**
 * Configuration du client Sanity pour BLUECOM
 */
const SANITY_PROJECT_ID = '0x8v5gxj';
const SANITY_DATASET = 'production';

/**
 * Fonction pour construire l'URL de l'image Sanity
 */
function urlFor(source) {
    if (!source || !source.asset || !source.asset._ref) return 'assets/placeholder-blog.jpg';
    const ref = source.asset._ref;
    const [_file, id, dimensions, extension] = ref.split('-');
    return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dimensions}.${extension}`;
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
