import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import { SmartImageProps } from './SmartImage';

interface LazyImageProps {
    loader?: SmartImageProps['fallback'];
    children?: React.ReactNode;
}

export const LazyImage = (props: LazyImageProps) => {
    const { loader, children } = props;
    const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '250px' });

    if (!inView) {
        return <div ref={ref}>{loader}</div>;
    }

    return (
        <>{children}</>
    );
};
