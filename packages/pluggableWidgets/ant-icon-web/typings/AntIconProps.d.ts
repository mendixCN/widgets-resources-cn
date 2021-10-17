/**
 * This file was generated from AntIcon.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { EditableValue } from "mendix";

export type DatasourceTypeEnum = "buildin" | "addon";

export type BuildInIconEnum =
    | "tuichu"
    | "fanhui"
    | "facebook"
    | "twitter"
    | "xiangyou"
    | "right"
    | "fanhui1"
    | "fenxiang"
    | "xiangxia"
    | "xiangxia1"
    | "xiangxia2"
    | "suofang"
    | "chexiao"
    | "esc"
    | "chexiao1"
    | "iconfont"
    | "suoding"
    | "bianji"
    | "shoucang2"
    | "xinjian"
    | "shoucang1"
    | "gongkai"
    | "gouwuche1"
    | "zhongwen"
    | "shangchuan"
    | "yingwen"
    | "gouwuche2"
    | "shanchu"
    | "xiazai"
    | "sousuo"
    | "dashang"
    | "xiangmu"
    | "fuzhidaima1"
    | "wofaqi"
    | "xiangmuchengyuan"
    | "gengduo"
    | "wocanyu"
    | "lishi"
    | "piliang"
    | "shijian"
    | "gonggao"
    | "weixin"
    | "weibo"
    | "gerenzhanghu"
    | "tianjiachengyuan"
    | "soutubiao"
    | "souren"
    | "yuzhanghao"
    | "biaoqing"
    | "qq"
    | "weibo1"
    | "zuoxuan"
    | "fangda2"
    | "zuo2"
    | "suoxiao"
    | "you2"
    | "suoxiao2"
    | "youxuan2"
    | "zuo"
    | "zuoxuan2"
    | "shang"
    | "shang2"
    | "youxuan"
    | "xia2"
    | "fangda"
    | "xia"
    | "you"
    | "zhuanrang"
    | "dianzan"
    | "huifu"
    | "saoyisao"
    | "shuoming"
    | "jinggao"
    | "jieshi"
    | "youxiang"
    | "guanbi"
    | "qunzhu"
    | "fuzhichenggong"
    | "weijiaru"
    | "daishenhe"
    | "shenhetongguo"
    | "shenhejujue"
    | "xinjiantubiaoku"
    | "tubiaoku"
    | "gouwuche"
    | "huidingbu"
    | "dianzan1"
    | "morentouxiang"
    | "paixu"
    | "wenjian"
    | "github"
    | "yuzhanghao1"
    | "weibo2"
    | "you1"
    | "zuo1"
    | "shang1"
    | "iconfont1"
    | "gonggaodayi"
    | "gongnengjieshao"
    | "tubiaohuizhi"
    | "daimayingyong"
    | "zhifubao"
    | "alibaba"
    | "xiaomi"
    | "zhongguodianxin"
    | "tianmao"
    | "alimama"
    | "zhubajie"
    | "tengxunwang"
    | "aliyun"
    | "taobaowang"
    | "anzhuo"
    | "ios"
    | "pcduan"
    | "qingchu"
    | "huizhiguize"
    | "zhizuoliucheng"
    | "fuzhidaima"
    | "fankui1"
    | "weitijiao"
    | "chexiao2";

export interface IconSourceListType {
    url: string;
}

export interface IconSourceListPreviewType {
    url: string;
}

export interface AntIconContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    datasourceType: DatasourceTypeEnum;
    buildInIcon: BuildInIconEnum;
    value: string;
    valueAttribute?: EditableValue<string>;
    spin: boolean;
    iconSourceList: IconSourceListType[];
}

export interface AntIconPreviewProps {
    class: string;
    style: string;
    datasourceType: DatasourceTypeEnum;
    buildInIcon: BuildInIconEnum;
    value: string;
    valueAttribute: string;
    spin: boolean;
    iconSourceList: IconSourceListPreviewType[];
}
