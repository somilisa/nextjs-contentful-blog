import Link from 'next/link';
import Head from 'next/head';
import { draftMode } from 'next/headers';

import Date from './date';
import CoverImage from './cover-image';
import Avatar from './avatar';
import MoreStories from './more-stories';

import { getAllPosts } from '@/lib/api';
import { CMS_NAME, CMS_URL } from '@/lib/constants';

function Intro() {
  return (
    <section className='flex-col flex items-center md:justify-between mt-16 mb-16 md:mb-12'>
      {/* <nav className='w-max py-3 px-8 border border-solid border-dark rounded-full font-medium capitalize flex items-center fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm'>
        <Link href='/' className='mr-2'>
          Nexeri
        </Link>
        <Link href='/' className='mr-2'>
          Home
        </Link>
        <Link href='/about' className='mr-2'>
          About
        </Link>
        <Link href='/contact' className='mr-2'>
          Contact
        </Link>
        <button>Menu </button>
      </nav> */}
      <nav className='w-full py-3  font-medium flex items-center justify-between '>
        <Link href='/' className='mr-2'>
          nexeri
        </Link>
        <button className='border border-solid border-dark rounded-xl px-5 py-1 text-xs'>
          {' '}
          Menu{' '}
        </button>
      </nav>
      <div className='w-full flex-col'>
        <p className='py-3 px-8 text-xs tracking-tighter leading-tight '>
          Our Stories
        </p>
        <h2 className=' px-8 text-2xl mt-1 font-semibold'>
          Follow the latest news in our lives and in the world of technology .
        </h2>
      </div>
    </section>
  );
}

function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: {
  title: string;
  coverImage: any;
  date: string;
  excerpt: string;
  author: any;
  slug: string;
}) {
  return (
    <section>
      <div className='mb-8 md:mb-16'></div>
      <div className='md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28'>
        <div>
          <CoverImage title={title} slug={slug} url={coverImage.url} />
        </div>
        <div>
          <h3 className='mb-4 text-4xl lg:text-6xl leading-tight'>
            <Link href={`/posts/${slug}`} className='hover:underline'>
              {title}
            </Link>
          </h3>

          <div className='mb-4 text-lg'>
            <Date dateString={date} />
          </div>

          <p className='text-lg leading-relaxed mb-4'>{excerpt}</p>
          {/* {author && <Avatar name={author.name} picture={author.picture} />} */}
        </div>
      </div>
    </section>
  );
}

export default async function Page() {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts(isEnabled);
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <div className='container mx-auto px-5'>
      <Intro />
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
      <MoreStories morePosts={morePosts} />
    </div>
  );
}
