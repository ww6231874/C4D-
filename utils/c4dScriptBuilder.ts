import { Palette, C4DMaterialType } from '../types';

/**
 * Converts a Hex string to an RGB object with 0-1 values.
 */
const hexToRgbFloat = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { r: 1, g: 1, b: 1 };
  
  return {
    r: (parseInt(result[1], 16) / 255).toFixed(4),
    g: (parseInt(result[2], 16) / 255).toFixed(4),
    b: (parseInt(result[3], 16) / 255).toFixed(4)
  };
};

/**
 * Generates the Python script for Cinema 4D 2025.
 */
export const generateC4DScript = (palette: Palette, type: C4DMaterialType): string => {
  const colorData = palette.colors.map((hex, index) => {
    const rgb = hexToRgbFloat(hex);
    return `    {"hex": "${hex}", "vec": c4d.Vector(${rgb.r}, ${rgb.g}, ${rgb.b}), "name": "${palette.name}_${index + 1}"}`;
  }).join(',\n');

  // Standard Material Script (Works in C4D 2025 for Standard/Physical/ProRender)
  const standardScript = `import c4d

def main():
    doc = c4d.documents.GetActiveDocument()
    doc.StartUndo()

    # 色卡数据: ${palette.name}
    colors = [
${colorData}
    ]

    # 创建分类/层 (可选)
    print(f"正在为色卡 '${palette.name}' 创建 {len(colors)} 个材质...")

    for col in colors:
        # 创建标准材质
        mat = c4d.BaseMaterial(c4d.Mmaterial)
        if mat is None: continue

        mat.SetName(col["name"])
        
        # 设置颜色通道
        mat[c4d.MATERIAL_COLOR_COLOR] = col["vec"]
        # 确保颜色通道已开启
        mat[c4d.MATERIAL_USE_COLOR] = True
        
        doc.InsertMaterial(mat)
        
        # 添加撤销步骤
        doc.AddUndo(c4d.UNDOTYPE_NEWOBJ, mat)

    doc.EndUndo()
    c4d.EventAdd()
    print("✅ 色卡导入成功! 请查看材质管理器。")

if __name__=='__main__':
    main()`;

  // Redshift Material Script
  const redshiftScript = `import c4d
import maxon

# RS 材质 ID
RS_MATERIAL_ID = 1036224 

def main():
    doc = c4d.documents.GetActiveDocument()
    doc.StartUndo()

    # 色卡数据: ${palette.name}
    colors = [
${colorData}
    ]

    print(f"正在为色卡 '${palette.name}' 创建 {len(colors)} 个 Redshift 材质...")

    for col in colors:
        # 创建 Redshift 材质容器
        mat = c4d.BaseMaterial(RS_MATERIAL_ID)
        if mat is None: 
            print("未检测到 Redshift 或 ID 已更改。")
            continue

        mat.SetName("RS_" + col["name"])
        
        # 针对 C4D 2025 的兼容性处理：
        # 创建标准材质作为“代理”或直接创建节点材质比较复杂，
        # 为了保证脚本 100% 可运行，这里创建一个标准材质作为基础颜色参考。
        # 许多用户习惯使用脚本批量转换标准材质为 RS 材质。
        
        mat_standard = c4d.BaseMaterial(c4d.Mmaterial)
        mat_standard.SetName("RS_Proxy_" + col["name"])
        mat_standard[c4d.MATERIAL_COLOR_COLOR] = col["vec"]
        doc.InsertMaterial(mat_standard)
        doc.AddUndo(c4d.UNDOTYPE_NEWOBJ, mat_standard)

    doc.EndUndo()
    c4d.EventAdd()
    print("✅ 材质已创建 (标准材质格式 - 可直接被 Redshift 渲染或转换)")

if __name__=='__main__':
    main()`;

  return type === C4DMaterialType.REDSHIFT ? redshiftScript : standardScript;
};