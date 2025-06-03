import { useScrollMemory } from "@wjjhhh/jhooks";

export default () => {
    useScrollMemory({
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