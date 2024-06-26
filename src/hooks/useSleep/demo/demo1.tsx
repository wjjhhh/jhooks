import React from 'react'
import { useSleep } from 'jhooks'

export default () => {
    const { sleep, destory } = useSleep(() => {
        console.log('destory sleep success1!')
    })
    const { sleep: sleep2, destory: destory2 } = useSleep(() => {
        console.log('destory sleep success2!')
    })
    const loogOp = async () => {
        await sleep(3000)
        console.log('loogOp:3s')
        await sleep(2000)
        console.log('loogOp:2s')
    }
    const loogOp2 = async () => {
        await sleep2(3000)
        console.log('loogOp2:3s')
        await sleep2(2000)
        console.log('loogOp2:2s')
    }
    return (
        <>
            <button onClick={loogOp}>耗时操作1</button>
            <button onClick={destory}>暂停操作1</button>
            <br />
            <button onClick={loogOp2}>耗时操作2</button>
            <button onClick={destory2}>暂停操作2</button>
           
        </>
    )
}