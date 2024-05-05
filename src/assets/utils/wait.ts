// 消息发出后创造等待时间的TypeScript脚本

const waitTime = (time: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null)
        }, time)
    })
}

const waitClick = (elements: NodeListOf<HTMLElement>) => {
    return new Promise((resolve) => {
        function handleClick(event: Event) {
            elements.forEach((element) => {
                element.setAttribute('contenteditable', 'true')
                element.removeEventListener('click', handleClick)
            })
            resolve((event.target as HTMLDivElement).innerText) 
        }
        elements.forEach((element) => {
            element.setAttribute('contenteditable', 'false')
            element.addEventListener('click', handleClick)
        })
    })
}

export { waitClick, waitTime }
