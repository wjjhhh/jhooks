import { useScrollPosition } from "@wjjhhh/jhooks";

export default () => {
    useScrollPosition({
        level: 'local'
    })

    return (
        <div style={{ height: 2300, background: '#fff'}}>
            <div>
                content
            </div>
        </div>

    )
}