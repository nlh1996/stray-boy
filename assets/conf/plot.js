export default [
    {
        "id": 1,
        "about": "前方发现个山洞",
        "chose": "山洞中发现一个宝箱",
        "no": "",
        "yes": "打开宝箱获得5个果子",
        "result": {
            "0": "102",
            "1": "5"
        },
        "type": "随机",
        "condition1": 0,
        "condition2": {},
        "condition3": 3,
        "condition4": 0,
        "primary": 0
    },
    {
        "id": 2,
        "about": "发现地上有五块钱，是否捡起",
        "chose": "一群大汉冲了出来，把你揍了一顿",
        "no": "",
        "yes": "失去500块钱",
        "result": {
            "0": "13",
            "1": "-500"
        },
        "type": "随机",
        "condition1": 0,
        "condition2": {},
        "condition3": 4,
        "condition4": 0,
        "primary": 0
    },
    {
        "id": 3,
        "about": "前方发现一个山洞，是否",
        "chose": "一个id=1出现",
        "no": "",
        "yes": "",
        "result": {},
        "type": "战斗",
        "condition1": 0,
        "condition2": {},
        "condition3": 5,
        "condition4": 0,
        "primary": 0
    },
    {
        "id": 4,
        "about": "一个莆田系的脑科医生公布了一套血炼功法，是否学习！",
        "chose": "半年之后，该医生自创血神教，号血神老祖，这套功法修炼有成之人纷纷变为其血奴，幸好你天赋不够，还没入门，就把自己练出内伤，实力大降低！",
        "no": "",
        "yes": "体质减1",
        "result": {
            "0": "体质",
            "1": "-1"
        },
        "type": "随机",
        "condition1": 0,
        "condition2": {},
        "condition3": 0,
        "condition4": 0,
        "primary": 1
    },
    {
        "id": 5,
        "about": "一个国家研究院的老院士公布了一套以心脏为发动机原理的修炼功法，是否学习！",
        "chose": "此后数百年，该功法成为人类修炼基础功法，无数奇功异法在此基础上诞生，你修炼成功入门，身体素质大幅提高！",
        "no": "",
        "yes": "体质加1",
        "result": {
            "0": "体质",
            "1": "1"
        },
        "type": "随机",
        "condition1": 0,
        "condition2": {},
        "condition3": 0,
        "condition4": 0,
        "primary": 1
    },
    {
        "id": 6,
        "about": "寒冰射手的试炼",
        "chose": "一个id=2出现",
        "no": "",
        "yes": "",
        "result": {},
        "type": "战斗",
        "condition1": 1,
        "condition2": {
            "0": "体质",
            "1": "20"
        },
        "condition3": 0,
        "condition4": 30,
        "primary": 1
    }
]