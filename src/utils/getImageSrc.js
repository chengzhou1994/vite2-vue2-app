/*
 * 解决vite使用alias引入图片不显示的问题
 * 使用:<img :src="getSrc('about.jpg')" alt="" />
 * import.meta.globEager('/src/assets/images/*')会动态获取到/src/assets/images下的所有图片（不包括子文件夹），
 * 并且把图片的路径作为key值变成一个modules。这时传入图片的文件名modules[path].default，就把图片的路径动态映射出来。
 */
export const getSrc = (name) => {
  const path = `/src/assets/images/${name}`
  const modules = import.meta.globEager('/src/assets/images/*')
  return modules[path].default
}
