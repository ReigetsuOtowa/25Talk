interface baseStudent {
    Id: number
    Name: string
    Avatar: string
}

interface studentInfo {
    Id: number
    Name: string
    Birthday: string
    Avatars: string[]
    Bio: string
    Nickname: string[]
    School: string
    cnt: number
}

// 示例:
// "Id": 10000,
// "Name": "阿露",
// "Birthday": "3月12日",
// "Avatar": ["https://static.wikia.nocookie.net/blue-archive/images/d/de/Aru_Icon.png"],
// "Bio": "什么都能解决哦！",
// "Nickname": ["Aru", "社长", "亚瑠", "阿鲁"],
// "cnt": 0

interface Talk extends baseStudent {
    type: number // 0: student| 1: sensei| 4:system
    content: string
    flag: number
}

export { baseStudent, studentInfo, Talk }
