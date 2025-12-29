import { PrizeCategory } from "./types";

export const APP_TITLE = "2026 新年联欢会大抽奖";
export const SUB_TITLE = "马年大吉 · 万事如意";
export const STORAGE_KEY = "lottery_state_2026_v2";

/**
 * 抽奖名单 - 188人
 */
const RAW_NAMES = `
曹振华 邵明升 郭勇 崔凤春 姜巨慧 赵国月 佟国荣 张俊 宋玉良 邓秀君 方朝阳 孙慧 葛丽萍 王回生 卜阳 杜丽艳 李牧江 刘莹 崔莉莉 邱发文 钱慧蛟 赵志强 孙钢 谢亚丽 刘凯 谷长春 康伟 吴杰 张凌云 张军 刘明韻 王海涛 金丽莹 魏春新 王冬旭 谷海波 牟欣 郝俊刚 于丽利 吴艳杰 赵丽娜 宋联术 张艳超 田立欣 李妍妍 宋晓友 孙岩 侯雪晨 李静 李式瑜 张强 马万红 杨莉 吴文惠 王辉 尹月阳 尹新东 陈永余 王成栋 王国勇 贾耐斌 樊可军 黄雪 张欣 高波 宋彦梅 张卫国 孙书亮 王继新 李金辉 张辉 李玉兰 杜洪兰 杨晓丽 宋岩 赵丽丽 路凤桐 李纪全 马艳 李文奇 李海妹 杨晓明 周龙飞 郭玲 范海英 徐颖 刘伟 刘冬梅 杨俊峰 张春波 袁成平 王苗苗 祁继 于娜 王丽丽 付晓红 赵静 常宝松 徐廷辉 邓晓莹 韩燕 徐凤霞 卢丹 郭莹 黄玉娇 阚志民 赵婧伊 李志军 杨广 杨君 王斌 胡连富 耿迎俊 来洪臣 王莹 杨冠 李迪 苏俊卉 王仰东 张瑜 彭玲 杨冠男 刘芷欣 王乐乐 王威 张茂同 黄志强 庄严 袁野 刘蕊 董婷婷 夏文明 赵孝谦 于丽晶 庞德艳 石镜含 王师尧 付兴 王璐 蒋思梦 曲笛 苏仁 马旭 江朋 宋书瑶 邹婧怡 孙嘉恒 孙佳昕 何博 付洁莹 王琼 刘佳莹 李可 谷晓楠 万方旭 刘晓庆 董艺 范文宇 李曼 董柏辰 孙语晨 韩慧 方明 魏羽岑 张妍 沈悦 祁思源 高文亮 邱显涵 张潇予 郭亦泓 肖子歆 吴楠 贺承志 顾翀赫 吴昊 窦宇飞 窦义哲 白文龙 李雨涵 李想 张伯望 纪璇 卢璐 许世玉 康阳 肖遥 崔国栋
`;

// 使用 Set 进行去重，确保每个人只能中奖一次（基础池唯一）
const nameList = RAW_NAMES.split(/\s+/)
  .map((name) => name.trim())
  .filter((name) => name.length > 0);

export const MEMBER_LIST: string[] = Array.from(new Set(nameList));

/**
 * ==========================================
 * 抽奖轮次配置
 * ==========================================
 * 规则：
 * 1. 共有 4 轮抽奖。
 * 2. 每一轮包含 A、B 两个分组连续抽取。
 * 3. 分组 A 抽取 24 人，分组 B 抽取 23 人。
 * 4. 总计：(24 + 23) * 4 = 188 人。
 */
export const PRIZES: (PrizeCategory & {
  round: number;
  groupInRound: "A" | "B";
})[] = [
  // 第一轮
  {
    id: 1,
    round: 1,
    groupInRound: "A",
    name: "马到成功奖",
    count: 24,
    description: "祝您开局顺利，一马平川！",
  },
  {
    id: 2,
    round: 1,
    groupInRound: "B",
    name: "一马当先奖",
    count: 23,
    description: "愿您事事领先，拔得头筹！",
  },

  // 第二轮
  {
    id: 3,
    round: 2,
    groupInRound: "A",
    name: "龙马精神奖",
    count: 24,
    description: "祝您精力充沛，神采飞扬！",
  },
  {
    id: 4,
    round: 2,
    groupInRound: "B",
    name: "天马行空奖",
    count: 23,
    description: "愿您才思敏捷，创意无限！",
  },

  // 第三轮
  {
    id: 5,
    round: 3,
    groupInRound: "A",
    name: "万马奔腾奖",
    count: 24,
    description: "祝您事业兴旺，势不可挡！",
  },
  {
    id: 6,
    round: 3,
    groupInRound: "B",
    name: "快马加鞭奖",
    count: 23,
    description: "愿您乘势而上，再创佳绩！",
  },

  // 第四轮
  {
    id: 7,
    round: 4,
    groupInRound: "A",
    name: "金马玉堂奖",
    count: 24,
    description: "祝您富贵满堂，金玉满堂！",
  },
  {
    id: 8,
    round: 4,
    groupInRound: "B",
    name: "瑞马迎春奖",
    count: 23,
    description: "愿您喜迎新春，福气盈门！",
  },
];
