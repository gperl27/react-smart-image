import * as React from 'react'
import ReactDOM from 'react-dom'
import env from '../env.json'
import { ErrorBoundary } from 'react-error-boundary';
import { SmartImage } from './SmartImage';
import { useImage } from './useImage';

const TEST_IMAGE = 'https://picsum.photos/seed/200/300'
const TEST_IMAGE_2 = 'https://picsum.photos/seed/1000/1000'
const RANDOM_IMAGE = 'https://picsum.photos/seed/picsum/200/300'

const App = () => (
    <div>
        {
            Array.from(Array(25).keys()).map(key => {
                return (
                    <SmartImage
                        key={key}
                        src={`https://picsum.photos/id/${key}/300/300`}
                        previewUrl={env.PUBLIC_SKELETON_IMAGE}
                    />
                )
            })
        }
        <SmartImage
            src={TEST_IMAGE}
            fallback={<div>loading...</div>}
        />
        <SmartImage
            src={['404', '45asdf', '', 'bar', 'baz', '', TEST_IMAGE_2]}
            fallback={<div>loading...</div>}
        />
        <SmartImage
            src={['404', '45asdf', '', 'bar', 'baz', '']}
            fallback={<div>loading...</div>}
            errorFallback={<div>never found a good image</div>}
        />
        <SmartImage
            src={'https://picsum.photos/id/228/500/500'}
            fallback={null}
        />
        <SmartImage
            src={'https://picsum.photos/id/237/500'}
            previewUrl={'https://via.placeholder.com/500'}
        />
        <SmartImage
            errorFallback={<div>error</div>}
            src={''}
            alt="this should error"
        />
        <ErrorBoundary fallback={<div>custom error boundary</div>}>
            <React.Suspense fallback={<div>custom suspense</div>}>
                <SmartImage src={''} />
            </React.Suspense>
        </ErrorBoundary>
        <React.Suspense fallback={<div>custom suspense</div>}>
            <SmartImage src={TEST_IMAGE_2} />
        </React.Suspense>
        <div style={{ marginBottom: '2500px' }} />
        <SmartImage
            lazy={true}
            src={'https://picsum.photos/id/230/1000/1000'}
            fallback={<div>loading...</div>}
        />
        <SmartImage
            fallback={null}
            errorFallback={null}
            src={RANDOM_IMAGE}
            srcSet={`${RANDOM_IMAGE} 1x, ${TEST_IMAGE_2} 2x, ${TEST_IMAGE} 3x`}
        />
        <div style={{ marginBottom: '2500px' }} />
        {
            Array.from(Array(75).keys()).map(key => {
                return (
                    <SmartImage
                        key={key}
                        lazy={true}
                        src={`https://picsum.photos/id/${key}/300/300`}
                        previewUrl={env.PUBLIC_SKELETON_IMAGE}
                    />
                )
            })
        }
    </div>
)

const App2 = () => (
    <div>
        {
            Array.from(Array(25).keys()).map(key => {
                return (
                    <SmartImage
                        key={key}
                        suspense={false}
                        src={`https://picsum.photos/id/${key}/300/300`}
                        previewUrl={env.PUBLIC_SKELETON_IMAGE}
                    />
                )
            })
        }
        <SmartImage
            suspense={false}
            src={TEST_IMAGE}
            errorFallback={<div>error occurred</div>}
            fallback={<div>loading...</div>}
        />
        <SmartImage
            suspense={false}
            src={['404', '45asdf', '', 'bar', 'baz', '', TEST_IMAGE_2]}
            fallback={<div>loading...</div>}
        />
        <SmartImage
            suspense={false}
            src={['404', '45asdf', '', 'bar', 'baz', '']}
            errorFallback={<div>never found a good image</div>}
            fallback={<div>loading...</div>}
        />
        <SmartImage
            suspense={false}
            src={TEST_IMAGE_2}
        />
        <SmartImage
            suspense={false}
            src={['404', '45asdf', '', 'bar', 'baz', '']}
        />
        <div style={{ marginBottom: '2500px' }} />
        {
            Array.from(Array(75).keys()).map(key => {
                return (
                    <SmartImage
                        key={key}
                        lazy={true}
                        suspense={false}
                        src={`https://picsum.photos/id/${key}/300/300`}
                        previewUrl={env.PUBLIC_SKELETON_IMAGE}
                    />
                )
            })
        }
    </div>
)

const ImperativeSuspensefulWrapper = () => {
    return (
        <React.Suspense fallback={<div>Imperative loader...</div>}>
            <ImperativeSuspenseful />
        </React.Suspense>
    )
}
const ImperativeSuspenseful = () => {
    const { url } = useImage(TEST_IMAGE_2)

    return (
        <div style={{ width: '500px', height: '500px', background: `url(${url})`, backgroundSize: '500px 500px' }} />
    )
}

const ImperativeStateful = () => {
    const { url, isLoading, error } = useImage(TEST_IMAGE, false)

    if (isLoading) {
        return <div>loading...</div>
    }

    if (error) {
        return <div>error happened somehow</div>
    }

    return (
        <div style={{ width: '500px', height: '500px', background: `url(${url})`, backgroundSize: '500px 500px' }} />
    )
}

ReactDOM.render(
    <>
        <App />
        <App2 />
        <ImperativeSuspensefulWrapper />
        <ImperativeStateful />
    </>,
    document.getElementById('root')
);

// external api
export {
    useImage,
    SmartImage
}