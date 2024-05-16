import os
import utils
import cv2
import numpy as np

from typing import Final

file_path: Final[str] = "../assets/modules/"
# file_path: Final[str] = "./test/"

if __name__ == "__main__":
    assets = os.listdir(utils.toAbsolutePath(file_path))

    # 检查每张照片的上下左右分别有多少白像素，将白像素数量添加至20像素，删除多余的白像素
    for asset in assets:
        img = cv2.imread(utils.toAbsolutePath(file_path + asset))
        rows, cols, _ = img.shape

        # Calculate the number of white pixels in each direction
        up, down, left, right = 0, 0, 0, 0

        for i in range(rows):
            # print(img[i, :])
            # input()
            if np.all(img[i, :] == 255):
                up += 1
            else:
                break

        for i in range(rows - 1, -1, -1):
            if np.all(img[i, :] == 255):
                down += 1
            else:
                break

        for i in range(cols):
            if np.all(img[:, i] == 255):
                left += 1
            else:
                break

        for i in range(cols - 1, -1, -1):
            if np.all(img[:, i] == 255):
                right += 1
            else:
                break

        img = cv2.copyMakeBorder(img,
                                 max(0, 20 - up),
                                 max(0, 20 - down),
                                 max(0, 20 - left),
                                 max(0, 20 - right),
                                 cv2.BORDER_CONSTANT, value=[255, 255, 255])

        cv2.imwrite(utils.toAbsolutePath(file_path + asset), img)
