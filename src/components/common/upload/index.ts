// 分类树结构
type Tree = {
    id: number | string;
    name: string;
    path: string;
    is_enable: boolean;
    sort: number;
    children: Tree[];
};
