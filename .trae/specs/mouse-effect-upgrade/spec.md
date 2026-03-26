# 鼠标特效升级 - 综合光效版

## Why

现有像素光点拖尾效果过于简单，缺乏视觉冲击力和科技感。用户期望更炫酷、更超前的鼠标交互效果来提升博客的视觉体验。

## What Changes

### 核心效果组合

1. **星光拖尾 (Star Trail)**
   - 鼠标移动时产生流星般的渐变拖尾
   - 颜色渐变：青色 → 紫色 → 粉色
   - 拖尾带有发光效果和星芒
   - 拖尾长度 20-30px，逐渐消散

2. **粒子爆发 (Particle Burst)**
   - 鼠标点击时产生粒子爆炸效果
   - 粒子数量：15-25个
   - 粒子向外扩散并逐渐消失
   - 带随机大小和速度

3. **磁吸效果 (Magnetic Effect)**
   - 鼠标靠近元素时产生微妙的吸引动画
   - 元素有轻微的位移响应
   - 增强交互感和趣味性

4. **光环跟随 (Glow Follow)**
   - 鼠标周围始终有一个柔和的光环跟随
   - 光环有呼吸灯效果
   - 颜色与博客主题色呼应

## Impact

- **Affected specs**: 视觉效果模块
- **Affected code**:
  - `js/script.js` - 替换 `initPixelTrail()` 函数
  - `css/style.css` - 添加新效果样式

## ADDED Requirements

### Requirement: 星光拖尾效果

系统 SHALL 在用户移动鼠标时生成星光拖尾效果。

#### Scenario: 鼠标移动
- **WHEN** 用户移动鼠标
- **THEN** 在鼠标位置生成拖尾粒子
- **AND** 拖尾具有渐变色和发光效果
- **AND** 拖尾在 800ms 内逐渐消失

### Requirement: 点击粒子爆发

系统 SHALL 在用户点击时产生粒子爆发效果。

#### Scenario: 鼠标点击
- **WHEN** 用户点击页面
- **THEN** 在点击位置产生 15-25 个粒子
- **AND** 粒子向四周扩散
- **AND** 粒子在 600ms 内消失

### Requirement: 光环跟随

系统 SHALL 在鼠标周围显示跟随光环。

#### Scenario: 鼠标移动
- **WHEN** 鼠标在页面内移动
- **THEN** 显示一个柔和的光环跟随鼠标
- **AND** 光环有呼吸灯效果（透明度 0.3-0.7）
- **AND** 光环大小约 100px

### Requirement: 磁吸交互

系统 SHALL 在鼠标靠近可交互元素时产生响应。

#### Scenario: 鼠标靠近按钮/链接
- **WHEN** 鼠标靠近可点击元素
- **THEN** 元素产生微小的位移（2-5px）
- **AND** 位移方向朝向鼠标
- **AND** 带有轻微的弹性回弹效果

## MODIFIED Requirements

### Requirement: 禁用旧效果

旧效果 `initPixelTrail()` 的像素点拖尾功能 **将被移除**。

**Reason**: 与新效果功能重叠，且视觉效果不如新方案。

**Migration**: 直接替换函数实现，新效果自动生效。

## 技术实现细节

### 颜色方案
```
主色调：
- 青色 (Cyan): #00f5ff
- 紫色 (Purple): #a855f7
- 粉色 (Pink): #ec4899
- 白色星芒: #ffffff

光晕效果：
- 青色光晕: rgba(0, 245, 255, 0.5)
- 紫色光晕: rgba(168, 85, 247, 0.3)
```

### 性能优化
- Canvas 渲染代替 DOM 操作
- requestAnimationFrame 动画
- 对象池复用粒子对象
- 限制最大粒子数量（200个）
- 移动端禁用该效果
