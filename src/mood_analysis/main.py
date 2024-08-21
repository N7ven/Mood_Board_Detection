import cv2
import numpy as np
import requests
import detection
video_capture = cv2.VideoCapture(0)

# 1. Emotion Detection 
#detection.emotion_detection(video_capture,cv2)

# 2. Face Detection 
detection.face_detection(video_capture,cv2)

#   # The API endpoint
# url = "https://demo-ekyc.cb7banking.com/api/v1/currency/list"
# # Data to be sent
# data = {
#          "status": "Active",
# }
# # # A POST request to the API
# response = requests.post(url, json=data)
# # # Print the response
# print(response.json())