# 通勤轻养

给忙碌生活留一点轻盈。适合通勤时间长、工作任务多的人的个人习惯管理工具，手机浏览器即可使用。

**[打开通勤轻养，直接使用](https://jiangna050420-eng.github.io/commute-light-care/)** · [GitHub 源码](https://github.com/jiangna050420-eng/commute-light-care)

可以把上面的使用链接分享给朋友，无需安装。每个人的记录保存在各自设备上。

## 能做什么

- 今天：常规、忙碌、最低限度三档计划，保留已完成任务，未完成的不会自动累积。
- 通勤：拆分步行、乘车、骑车、驾驶区间，只在乘车时安排 25 + 5 番茄；短区间可用短时任务。
- 成长：记录心情、精力、饮食、活动、选填体重；照片本机压缩、日期选择与并排对比。
- 复盘：近 7 天小行动与体重变化，保存回顾，导出定期提醒。
- 数据：IndexedDB 本机保存，完整 JSON 备份包含照片，校验后可恢复。

这是一款习惯记录工具，不生成热量处方、减重速度或体型评分。

## 数据与提醒

无需业务账号，无数据上传接口。日记和照片存储在当前浏览器，别人使用网页时不会看到你的记录。网页地址、浏览器或设备改变时，记录不会自动同步；请从原地址导出备份，在新地址恢复。清除浏览器数据可能导致记录丢失。

请妥善保管备份文件，其中包含全部日记和照片。建议定期备份。

网页计时不能保证锁屏或关页后触发通知。日历导出只安排通勤开始与复盘，不安排每轮番茄提示。导入后需检查手机日历的通知设置；修改网页设置后需要替换旧事件，重复导入可能产生重复提醒。日历时间使用设备本地时间。

## 本地运行

需要 Node.js 22.13 或更高版本。

```sh
npm ci
npm run dev
```

打开终端显示的本地地址。

```sh
npm run typecheck
npm test
npm run build
npm run preview
```

React + TypeScript + Vite，界面使用现有 Shadcn / Radix 组件。所有业务逻辑在浏览器运行，无需服务端、数据库账号或 API 密钥。

## 部署到 GitHub Pages

1. 将源码放到你的 GitHub 仓库的 `main` 分支。
2. 在仓库 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。
3. 在 **Actions → Publish GitHub Pages** 中运行工作流，或推送一次新提交。
4. 工作流依次安装依赖、类型检查、测试、构建并部署。成功后在 Pages 设置或部署记录中打开网站。

工作流自动采用 Pages 的路径设置，支持普通项目仓库与个人主页仓库。后续推送到 `main` 会自动更新网站。也可下载代码在本地运行。

部署过程参考 [Vite 官方说明](https://vite.dev/guide/static-deploy.html#github-pages) 与 [GitHub Pages 自定义工作流说明](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

## 测试范围

自动化用例覆盖档位保留完成任务、混合交通、短时任务、跨午夜与重叠时间、计时恢复、日历重复规则与中文折行、备份格式与照片校验、统计日期范围。真实手机日历通知是否触发，需要在自己的设备上导入后确认。
