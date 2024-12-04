import Link from 'next/link';
import MarkdownDisplay from '../../../components/markdown-display'
import axios from 'axios';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Classroom from '@/models/Classroom';
import Assignment from '@/models/Assignment';
import Code from '@/models/Code';
import Doc from '@/models/Doc';
import { randomInt } from 'crypto';

interface AnsProps {
    title: string,
    content: string,
    views: number,
    createdAt: Date,
    author: string
}

export default async function MarkdownPage({ params }: { params: { id: string } }) {

    const docId = (await params).id;

    let ans: AnsProps = {
        title: "Không xác định",
        content: "# Không xác định",
        views: 0,
        createdAt: new Date(),
        author: "Unknown"
    };

    try {
        connectToDatabase();

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
        console.log("Error: ", error);
    }

    return (
        <main className="container mx-auto px-4 pt-2 py-8">
            <header className="mb-3 border-b-[1px] py-5 border-gray-300 flex justify-between">
                <div>
                    <h1 className="text-3xl font-bold">{ans.title}</h1>
                    <p className="text-gray-600">Đăng bởi <i>{ans.author}</i> vào {ans.createdAt.toLocaleDateString()}</p>
                </div>
                <p>👁️ {ans.views} lượt xem</p>
            </header>
            <MarkdownDisplay content={ans.content} />
            <footer className="mt-8 border-t pt-4">
                <p className="text-center text-gray-500">© 2024 SFIT | <Link href={'https://github.com/zunohoang'} target='_blank' >zunohoang</Link>. All rights reserved.</p>
            </footer>
        </main>
    )
}

