import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next'
import MarkdownDisplay from '@/components/markdown-display'
import connectToDatabase from '@/lib/mongodb';
import Doc from '@/models/Doc';

interface AnsProps {
    title: string,
    content: string,
    views: number,
    createdAt: Date,
    author: string
}

export async function generateMetadata(
    { params }: { params: any },
    parent: ResolvingMetadata
): Promise<Metadata> {

    const resolvedParams = await params; // Chờ giải Promise của params
    const docId = resolvedParams.id;

    await connectToDatabase();
    const doc = await Doc.findOne({ _id: docId });

    return {
        title: doc.title,
        description: `${doc.content.substring(0, 160)}...`,
        openGraph: {
            title: doc.title,
            description: `${doc.content.substring(0, 160)}...`,
            type: 'article',
            authors: [doc.author],
            publishedTime: doc.createdAt.toISOString(),
            images: [
                {
                    url: '/bgclb.jpg',
                    alt: doc.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: doc.title,
            description: `${doc.content.substring(0, 160)}...`,
        },
    }
}

export default async function MarkdownPage({ params }: { params: any }) {

    const resolvedParams = await params; // Chờ giải Promise của params
    const docId = resolvedParams.id;

    let ans: AnsProps = {
        title: "Không xác định",
        content: "# Không xác định",
        views: 0,
        createdAt: new Date(),
        author: "Unknown"
    };

    try {
        await connectToDatabase();
        const doc = await Doc.findOne({ _id: docId });

        ans = {
            title: doc.title,
            content: doc.content,
            views: doc.views,
            createdAt: doc.createdAt,
            author: doc.author
        }

        console.log(ans);

    } catch (error) {
        console.error("Error: ", error);
    }

    return (
        <main className="container mx-auto px-4 pt-2 py-8">
            <header className="mb-3 border-b-[1px] py-5 border-gray-300 flex justify-between">
                <div>
                    <h1 className="text-3xl font-bold">{ans.title}</h1>
                    <p className="text-gray-600">Đăng bởi <i>{ans.author}</i> vào <time dateTime={ans.createdAt.toISOString()}>{ans.createdAt.toLocaleDateString()}</time></p>
                </div>
                <p>👁️ {ans.views} lượt xem</p>
            </header>
            <article>
                <MarkdownDisplay content={ans.content} />
            </article>
            <footer className="mt-8 border-t pt-4">
                <p className="text-center text-gray-500">© 2024 SFIT | <Link href={'https://github.com/zunohoang'} target='_blank' rel="noopener noreferrer">zunohoang</Link>. All rights reserved.</p>
            </footer>
        </main>
    )
}

