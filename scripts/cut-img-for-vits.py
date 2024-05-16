import cv2
import utils

if __name__ == "__main__":
    img = cv2.imread(utils.toAbsolutePath("../public/vit/example.jpg"))

    # Cut the image into 9 pieces
    rows, cols, _ = img.shape
    for i in range(3):
        for j in range(3):
            cv2.imwrite(utils.toAbsolutePath(f"../public/vit/example_{i}_{j}.jpg"),
                        img[i * rows // 3: (i + 1) * rows // 3, j * cols // 3: (j + 1) * cols // 3])
