import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { LazyImage } from './LazyImage';
import { StatefulImage } from './StatefulImage';
import { SuspensefulImage } from './SuspensefulImage';

export type ImageList = string | string[]

interface SanitizedFragmentProps {
    children?: React.ReactNode
}

export interface SmartImageProps extends Omit<React.ComponentProps<'img'>, 'src'> {
    src?: ImageList
    lazy?: boolean
    previewUrl?: string
    suspense?: boolean
    fallback?: React.ReactElement
    errorFallback?: React.ReactElement
}

export interface ReactImageProps extends Omit<React.ComponentProps<'img'>, 'src'> {
    src?: ImageList
    shouldUseSupense?: boolean
    fallback?: SmartImageProps['fallback']
    errorFallback?: SmartImageProps['errorFallback']
}

export const SmartImage = ({
    src,
    lazy,
    suspense = true,
    previewUrl,
    fallback,
    errorFallback,
    ...restImgProps
}: SmartImageProps) => {
    fallback = previewUrl ? <img src={previewUrl} {...restImgProps} /> : fallback
    const ErrorBoundaryContainer = fragmentFactory(ErrorBoundary, suspense)
    const SuspenseContainer = fragmentFactory(React.Suspense, suspense)
    const LazyContainer = fragmentFactory(LazyImage, !!lazy)

    return (
        <LazyContainer loader={fallback}>
            <ErrorBoundaryContainer fallback={errorFallback}>
                <SuspenseContainer fallback={fallback}>
                    <ReactImage
                        src={src}
                        shouldUseSupense={suspense}
                        errorFallback={errorFallback}
                        fallback={fallback}
                        {...restImgProps}
                    />
                </SuspenseContainer>
            </ErrorBoundaryContainer>
        </LazyContainer>
    )
}

const ReactImage = (props: ReactImageProps) => {
    const { shouldUseSupense, ...imageProps } = props
    const ImageComponent = imageComponentFactory(shouldUseSupense)

    return <ImageComponent {...imageProps} />
}

const imageComponentFactory = (shouldUseSuspense: boolean) => {
    return shouldUseSuspense ? SuspensefulImage : StatefulImage
}

const fragmentFactory = <T,>(component?: React.JSXElementConstructor<T>, condition = true) => {
    return component && condition ? component : SanitizedFragment
}

const SanitizedFragment = (props: SanitizedFragmentProps) => {
    return (
        <>{props.children}</>
    )
}