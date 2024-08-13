import cv2
import numpy as np
import mood_analysis.detection
import requests

video_capture = cv2.VideoCapture(0)

# 1. Emotion Detection 
#detection.emotion_detection(video_capture,cv2)

# 2. Face Detection 
mood_analysis.detection.face_detection(video_capture,cv2)

#  # The API endpoint
# url = "https://jsonplaceholder.typicode.com/posts"
# # Data to be sent
# data = {
#         "userID": 1,
#         "title": "Making a POST request",
#         "body": "This is the data we created."
# }
# # A POST request to the API
# response = requests.post(url, json=data)
# # Print the response
# print(response.json())