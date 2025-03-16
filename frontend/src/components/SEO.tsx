import { Helmet } from '@dr.pogodin/react-helmet';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
    url?: string;
}

const SEO = ({
    title = 'Warframe Weapons Discarder',
    description = 'A tool to help Warframe players identify which weapons can be safely discarded and which ones are needed for crafting other weapons.',
    keywords = ['warframe', 'weapons', 'discard', 'crafting', 'guide', 'tool'],
    image = '/og-image.png', // You'll need to add this image to your public folder
    url = 'https://your-domain.com', // Replace with your actual domain
}: SEOProps) => {
    const formattedTitle = `${title} | Warframe Tool`;

    return (
        <Helmet>
            {/* Basic meta tags */}
            <title>{formattedTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords.join(', ')} />

            {/* Open Graph meta tags for social sharing */}
            <meta property="og:title" content={formattedTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />

            {/* Twitter Card meta tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={formattedTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Additional meta tags */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="robots" content="index, follow" />
            <meta name="theme-color" content="#1976d2" /> {/* Match your primary color */}

            {/* Canonical URL */}
            <link rel="canonical" href={url} />

            {/* Structured data for better SEO */}
            <script type="application/ld+json">
                {JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'WebApplication',
                    'name': title,
                    'description': description,
                    'url': url,
                    'applicationCategory': 'Game Tool',
                    'operatingSystem': 'Web Browser',
                    'offers': {
                        '@type': 'Offer',
                        'price': '0',
                        'priceCurrency': 'USD'
                    }
                })}
            </script>
        </Helmet>
    );
};

export default SEO; 