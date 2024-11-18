import cv2
import os
from google.colab.patches import cv2_imshow
import urllib.request

# Download Haarcascade if not already present
haarcascade_path = 'haarcascade_frontalface_default.xml'
if not os.path.exists(haarcascade_path):
    url = 'https://github.com/opencv/opencv/raw/master/data/haarcascades/haarcascade_frontalface_default.xml'
    urllib.request.urlretrieve(url, haarcascade_path)
    print("Haarcascade downloaded successfully!")

# Function to detect and display faces
def detect_and_display_faces(image_path, classifier_path):
    # Load the photograph
    pixels = cv2.imread(image_path)
    if pixels is None:
        print(f"Error: Image not found at {image_path}")
        return

    # Convert to grayscale
    gray = cv2.cvtColor(pixels, cv2.COLOR_BGR2GRAY)

    # Load the pre-trained model
    classifier = cv2.CascadeClassifier(classifier_path)
    if classifier.empty():
        print(f"Error: Haarcascade file not found at {classifier_path}")
        return

    # Perform face detection
    bboxes = classifier.detectMultiScale(gray)

    # Draw rectangles over detected faces
    for box in bboxes:
        x, y, width, height = box
        x2, y2 = x + width, y + height
        cv2.rectangle(pixels, (x, y), (x2, y2), (0, 0, 255), 2)

    # Show the image (Colab uses cv2_imshow)
    cv2_imshow(pixels)

# List of image paths
image_paths = ['faces.jpeg', 'berkeley_faces.jpg', 'pexels-photo-2379005.jpeg']

# Upload your images to Colab
print("Please upload your images using the file upload interface.")

# Run detection on uploaded images
for img_path in image_paths:
    detect_and_display_faces(img_path, haarcascade_path)
