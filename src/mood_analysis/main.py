import cv2
import numpy as np
import requests
import detection
import detection_pic
video_capture = cv2.VideoCapture(0)


# 2. Face Detection with Video Capture
# detection.face_detection(video_capture,cv2)

# 2. Face Detection with Photo Capture
detection_pic.face_detection(cv2)