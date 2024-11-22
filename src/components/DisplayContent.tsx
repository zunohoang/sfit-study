
/**
 * Project: study.sfit.com.vn
 * Author: zunohoang (https://github.com/zunohoang)
 * Email: nguyenvanhoang2005nt@gmail.com
 */

import React, { useEffect, useState } from 'react';

interface DisplayContentProps {
    content: string;
    className?: string;
}

const DisplayContent: React.FC<DisplayContentProps> = ({ content, className }) => {
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};

export default DisplayContent;