/*
 * @Author: weichunpei
 * @Date: 2024-01-24 17:37:59
 * @LastEditors: weichunpei
 * @LastEditTime: 2024-01-25 15:46:37
 * @Description: 增加水印
 * @param {string} text 文字
 */

export const addWaterMarker = (
  params = {
    text: "",
    elNode: "",
    font: "",
    fillStyle: "",
    rotateAngle: 0,
    fillX: 0,
    fillY: 0,
  }
) => {
  const { text, elNode, font, fillStyle, rotateAngle, fillX, fillY } = params;

  const tmpFillX = fillX || 20;
  const tmpFillY = fillY || 75;
  let node: any = elNode;
  if (!text) return;
  if (!elNode) {
    node = document.body;
  }
  if (elNode && typeof elNode === "string") {
    node = document.querySelector(node) as HTMLElement;
  }
  try {
    const can: HTMLCanvasElement = document.createElement("canvas");
    node.appendChild(can);
    can.width = tmpFillX * 10;
    can.height = tmpFillY * 2;
    can.style.display = "none";
    const cans = can.getContext("2d") as CanvasRenderingContext2D;
    cans.rotate(rotateAngle || (-20 * Math.PI) / 180);
    cans.font = font || "16px Microsoft JhengHei";
    cans.fillStyle = fillStyle || "rgba(180, 180, 180, 0.3)";
    cans.textAlign = "left";
    cans.textBaseline = "Middle" as CanvasTextBaseline;
    cans.fillText(text, tmpFillX, tmpFillY);
    node.style.backgroundImage = "url(" + can.toDataURL("image/png") + ")";
  } catch (error) {
    console.error("addWaterMarker error: ", error);
  }
};

/*
 * @Author: weichunpei
 * @Date: 2024-01-24 17:37:59
 * @LastEditors: weichunpei
 * @LastEditTime: 2024-01-25 15:30:11
 * @Description: 移除水印
 */
export const removeWatermark = (elNode) => {
  let node: any = elNode;
  if (!elNode) {
    node = document.body;
  }
  if (elNode && typeof elNode === "string") {
    node = document.querySelector(node) as HTMLElement;
  }
  node.style.backgroundImage = null;
};
