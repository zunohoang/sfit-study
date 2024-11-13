import React, { useEffect, useState } from 'react';

interface DisplayContentProps {
    content: string;
}

const DisplayContent: React.FC<DisplayContentProps> = ({ content }) => {
    return (
        <div
            className="border border-gray-300 p-4 rounded-lg prose max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};

export default DisplayContent;