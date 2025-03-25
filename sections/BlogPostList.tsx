import type { ImageWidget } from 'apps/admin/widgets.ts'
import type { BlogPost } from 'apps/blog/types.ts'
import Image from 'apps/website/components/Image.tsx'
import { ContentContainer } from '../components/Layout.tsx'
import { Body, H1 } from '../components/ui/Typography.tsx'
import Badge from '../components/ui/Badge.tsx'
import Icon from '../components/ui/Icon.tsx'
import SliderControllerJS from '../islands/SliderJS.tsx'
import Button from 'site/components/ui/Button.tsx'

interface BlogCase {
    /**
     * Blog posts array from which to select the featured post
     * The first post in the array will be featured
     */
    posts?: BlogPost[] | null

    /**
     * Fallback title if no post is provided or found
     * @default "Livemode constrói seu próprio Photoshop"
     */
    fallbackTitle?: string

    /**
     * Fallback excerpt if no post is provided or found
     * @default "Saiba como a Livemode, parceira da Cazé TV, está criando material gráficos para suas transmissões 100x mais rápido com 40 AI Agents diferentes."
     */
    fallbackExcerpt?: string

    /**
     * Fallback image if no post is provided or found
     */
    fallbackImage?: ImageWidget

    /**
     * Button text
     * @default "Ler mais"
     */
    buttonText?: string
}

export interface BlogPostListProps {
    /**
     * Badge text displayed at the top of the section
     * @default "Nossas soluções"
     */
    badgeText?: string

    /**
     * Section title
     * @default "Transformações reais com AI"
     */
    title?: string

    /**
     * Blog posts array to display
     * Will show up to 6 posts
     */
    posts?: BlogPost[] | null

    blogCase?: BlogCase
}

function BlogPostCard({ post }: { post: BlogPost }) {
    const logoBrand = post.extraProps?.find(prop => prop.key === 'logoBrand')?.value

    return (
        <div className='relative w-[300px] h-[400px] sm:w-[384px] sm:h-[600px] group flex-shrink-0'>
            <Image
                src={post.image || ''}
                alt={post.title || ''}
                width={384}
                height={683}
                class='w-full h-full object-cover absolute inset-0'
            />
            <div className='absolute inset-0 bg-gradient-to-b from-zinc-900/0 to-ca-900' />

            {logoBrand && (
                <div className='absolute top-0 left-0 h-12 p-5 bg-ca-900'>
                    <Image
                        src={logoBrand}
                        alt={`${post.title} logo`}
                        width={96}
                        height={24}
                        class='h-full w-auto object-contain'
                    />
                </div>
            )}

            <div className='absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3'>
                <h3 className="text-ca-50 text-xl font-medium font-['Inter'] leading-7">{post.title}</h3>
                <p className="text-ca-300 text-base font-normal font-['Inter'] leading-normal">{post.excerpt}</p>
            </div>
        </div>
    )
}

function FeaturedBlogPost({
    posts,
    fallbackTitle = '',
    fallbackExcerpt = '',
    fallbackImage = 'https://placehold.co/742x556',
    buttonText = 'Ler mais',
}: BlogCase) {
    // Get the first post from the array if available
    const post = posts?.[0]

    if (!post) {
        return (
            <div className='w-full bg-ca-900 overflow-hidden'>
                <ContentContainer>
                    <div className='flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10'>
                        {/* Content Column */}
                        <div className='w-full lg:w-1/2 flex flex-col justify-center items-start gap-4 sm:gap-6 md:gap-10 px-4 sm:px-6 md:px-8 lg:px-14'>
                            <div className='w-full flex flex-col justify-start items-start gap-3 sm:gap-4 md:gap-6'>
                                <H1 className='text-left text-ca-50 text-2xl sm:text-3xl lg:text-4xl font-normal font-serif'>
                                    {fallbackTitle}
                                </H1>

                                <Body class='text-ca-300 text-sm sm:text-base'>{fallbackExcerpt}</Body>
                            </div>

                            <Button href='/blog' variant='primary' size='md'>
                                {buttonText}
                            </Button>
                        </div>

                        {/* Image Column */}
                        <div className='w-full lg:w-1/2'>
                            <Image
                                src={fallbackImage}
                                alt={fallbackTitle}
                                width={742}
                                height={556}
                                class='w-full h-auto rounded-lg object-cover aspect-[4/3]'
                                preload
                            />
                        </div>
                    </div>
                </ContentContainer>
            </div>
        )
    }

    // Extract content from the blog post
    const title = post.title || fallbackTitle
    const excerpt = post.excerpt || fallbackExcerpt
    const image = post.image || fallbackImage
    const postUrl = `/blog/${post.slug || post.title?.toLowerCase().replace(/\s+/g, '-')}`

    return (
        <div className='w-full bg-ca-900 overflow-hidden'>
            <ContentContainer>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10'>
                    {/* Content Column */}
                    <div className='w-full lg:w-1/2 flex flex-col justify-center items-start gap-4 sm:gap-6 md:gap-10 px-4 sm:px-6 md:px-8 lg:px-14'>
                        <div className='w-full flex flex-col justify-start items-start gap-3 sm:gap-4 md:gap-6'>
                            <H1 className='text-left text-ca-50 text-2xl sm:text-3xl lg:text-4xl font-normal font-serif'>
                                {title}
                            </H1>

                            <Body class='text-ca-300 text-sm sm:text-base'>{excerpt}</Body>
                        </div>

                        <Button href={postUrl} variant='primary' size='md' class='w-full sm:w-auto'>
                            {buttonText}
                        </Button>
                    </div>

                    {/* Image Column */}
                    <div className='w-full lg:w-1/2 mt-6 lg:mt-0'>
                        <Image
                            src={image}
                            alt={title}
                            width={742}
                            height={556}
                            class='w-full h-auto rounded-lg object-cover aspect-[4/3]'
                            preload
                        />
                    </div>
                </div>
            </ContentContainer>
        </div>
    )
}

export default function BlogPostList({
    badgeText = 'Nossas soluções',
    title = 'Transformações reais com AI',
    posts,
    blogCase,
}: BlogPostListProps) {
    const displayPosts = posts?.filter(post => post && post.image)?.slice(1, 7) || []

    return (
        <section className='w-full py-20' id='cases'>
            <ContentContainer>
                <div className='flex px-4 sm:px-16 flex-col gap-8 sm:gap-16'>
                    {/* Header */}
                    <div className='flex justify-between items-end flex-wrap gap-8'>
                        <div className='flex flex-col gap-6 max-w-[883px]'>
                            <Badge variant='outline' color='secondary' withDot dotColor='primary'>
                                {badgeText}
                            </Badge>
                            <h2 className='text-ca-50 text-4xl sm:text-5xl lg:text-6xl font-normal font-serif leading-[56px]'>
                                {title}
                            </h2>
                        </div>
                    </div>
                    <div className='w-full h-px bg-ca-700' />

                    <FeaturedBlogPost {...blogCase} />

                    {/* Navigation Buttons */}
                    <div className='flex justify-start items-center ml-auto gap-2'>
                        <button
                            type='button'
                            className='p-2 border border-ca-700 rounded-full hover:border-ca-500 transition-colors'
                            data-slide='prev'
                            aria-label='Previous posts'
                        >
                            <Icon id='ChevronLeft' size={16} strokeWidth={2} className='text-ca-50' />
                        </button>
                        <button
                            type='button'
                            className='p-2 border border-ca-700 rounded-full hover:border-ca-500 transition-colors'
                            data-slide='next'
                            aria-label='Next posts'
                        >
                            <Icon id='ChevronRight' size={16} strokeWidth={2} className='text-ca-50' />
                        </button>
                    </div>

                    {/* Posts Container */}
                    <div className='relative'>
                        {/* Scrollable Container */}
                        <div
                            data-slider
                            className='flex gap-3 overflow-x-auto snap-x snap-mandatory'
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                WebkitOverflowScrolling: 'touch',
                            }}
                        >
                            {displayPosts.length > 0 ? (
                                displayPosts.map((post, index) => (
                                    <div
                                        key={post.slug || index}
                                        data-slider-item={index}
                                        className='shrink-0 snap-center'
                                    >
                                        <BlogPostCard post={post} />
                                    </div>
                                ))
                            ) : (
                                <div className='w-full text-center text-ca-300 py-8'>No posts available</div>
                            )}
                        </div>
                    </div>
                </div>
            </ContentContainer>
            <SliderControllerJS rootId='cases' infinite scroll='smooth' />
        </section>
    )
}
