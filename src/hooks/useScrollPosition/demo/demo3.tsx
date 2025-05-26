import { useRef } from 'react';
import { useScrollPosition } from "@wjjhhh/jhooks";

export default () => {
    const ref = useRef(null)
    useScrollPosition({
        level: 'local',
        target: ref,
        direction: 'x',
    })

    return (
        <div style={{ width: '100%', overflowX: 'auto' }} ref={ref}>
            <div style={{ height: 30, background: 'yellow', color: '#000', 'whiteSpace': 'nowrap' }}>
                s关键字用于定义一个类型谓词函数，该函数通过特定的条件判断一个值是否符合某个类型。当这个函数返回true时，TypeScript编译器会认为该值是特定的类型，从而允许对该值进行该类型特有的操作。例如，通过value is Type语法，可以明确告诉编译器：当函数返回true时，参数一定是特定类型‌
                1。
            </div>
        </div>

    )
}