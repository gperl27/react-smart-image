import * as React from 'react'
import { ReactImageProps } from "./SmartImage"
import { useImageWithState } from "./useImageWithState"

export const StatefulImage = (props: ReactImageProps) => {
    const { src, fallback = null, errorFallback = null, ...restProps } = props
    const { url, isLoading, error } = useImageWithState(src, !!errorFallback)

    if (isLoading) {
        return fallback
    }

    if (error) {
        return errorFallback
    }

    return (
        <img src={url} {...restProps} />
    )
}