import cv2, queue, threading, time
import face_recognition
import numpy as np
from deepface import DeepFace  
import math
import argparse
import logging
import requests 
import os 
import base64 

def face_detection(cv2):

  # Face Detection variable declrations ***************************************

  # Load a sample picture and learn how to recognize it.
  obama_image = face_recognition.load_image_file("files/obama.jpg")
  obama_face_encoding = face_recognition.face_encodings(obama_image)[0]

  # Load a second sample picture and learn how to recognize it.
  biden_image = face_recognition.load_image_file("files/biden.jpg")
  biden_face_encoding = face_recognition.face_encodings(biden_image)[0]

  selva_image = face_recognition.load_image_file("files/selva3.jpeg")
  selva_face_encoding = face_recognition.face_encodings(selva_image)[0]

  kanish_image = face_recognition.load_image_file("files/kanish.jpeg")
  kanish_face_encoding = face_recognition.face_encodings(kanish_image)[0]

  narmathaa_image = face_recognition.load_image_file("files/narmathaa.jpeg")
  narmathaa_face_encoding = face_recognition.face_encodings(narmathaa_image)[0]

  # Create arrays of known face encodings and their names
  known_face_encodings = [
    obama_face_encoding,
    biden_face_encoding,
    selva_face_encoding,
    kanish_face_encoding,
    narmathaa_face_encoding
  ]
  known_face_names = [
    "Barack Obama",
    "Joe Biden",
    "Selva",
    "Kanish",
    "Narmathaa"
  ]
  # Initialize some variables
  name = ''
  age = ''
  gender = ''
  emotion = ''
  base64_string = ''
  left = 0
  bottom = 0
  font = 0

  face_locations = []
  face_encodings = []
  face_names = []
  process_this_frame = True
  face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
  # Age & Gender variable declrations ***************************************
  parser=argparse.ArgumentParser()
  parser.add_argument('--image')
  args=parser.parse_args()
  faceProto='files/opencv_face_detector.pbtxt'
  faceModel='files/opencv_face_detector_uint8.pb'
  ageProto="files/age_deploy.prototxt"
  ageModel="files/age_net.caffemodel"
  genderProto="files/gender_deploy.prototxt"
  genderModel="files/gender_net.caffemodel"

  MODEL_MEAN_VALUES=(78.4263377603, 87.7689143744, 114.895847746)
  ageList=['(0-2)', '(4-6)', '(8-12)', '(15-20)', '(25-32)', '(38-43)', '(48-53)', '(60-100)']
  genderList=['Male','Female']

  logging.info('log'+faceProto)
  logging.info('This is an info message')

  faceNet=cv2.dnn.readNet(faceModel,faceProto)
  ageNet=cv2.dnn.readNet(ageModel,ageProto)
  genderNet=cv2.dnn.readNet(genderModel,genderProto)

  while True:

    # Emotion Detection part of the code***************************************
    # Grab a single frame of video
    # ret, frame = video_capture.read()
    frame = face_recognition.load_image_file('Images/profile.png')
    # Convert frame to grayscale
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    # Convert grayscale frame to RGB format
    rgb_frame = cv2.cvtColor(gray_frame, cv2.COLOR_GRAY2RGB)
    # Detect faces in the frame
    faces = face_cascade.detectMultiScale(gray_frame, scaleFactor=1.1, minNeighbors=5, minSize=(60, 60))
    # Face Detection part of the code ***************************************
    if process_this_frame:
        # Resize frame of video to 1/4 size for faster face recognition processing
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)
        # Find all the faces and face encodings in the current frame of video
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
        face_names = []
        for face_encoding in face_encodings:
            # See if the face is a match for the known face(s)
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            name = "Unknown"
            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = known_face_names[best_match_index]
            face_names.append(name)
            print(face_names)

    process_this_frame = not process_this_frame

    # Emotion Detection part of the code ****************************************
        # Display the results
    for (x, y, w, h) in faces:
        # Extract the face ROI (Region of Interest)
        face_roi = rgb_frame[y:y + h, x:x + w]
        # Perform emotion analysis on the face ROI
        #result = DeepFace.analyze(face_roi, actions=['age', 'gender', 'race', 'emotion'], enforce_detection=False)
        result = DeepFace.analyze(img_path = "Images/profile.png", actions=['age', 'gender', 'race', 'emotion'], enforce_detection=False)
        # Determine the dominant emotion
        emotion = result[0]['dominant_emotion']
        age = result[0]['age']
        gender = result[0]['dominant_gender']
        race = result[0]['dominant_race']

        # # Draw rectangle around face and label with predicted emotion
        #cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)
        cv2.putText(frame, emotion+"-"+str(age)+"-"+gender+"-"+race, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)
        print(result[0]['age']," years old ",result[0]["dominant_race"]," ",result[0]["dominant_emotion"]," ", result[0]["dominant_gender"])
        #print(result)
        print(emotion)
        
    # Face Detection part of the code ****************************************
    for (top, right, bottom, left), name in zip(face_locations, face_names):
        # Scale back up face locations since the frame we detected in was scaled to 1/4 size
        top *= 4
        right *= 4
        bottom *= 4
        left *= 4
        # Draw a box around the face
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
        # Draw a label with a name below the face
        cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)
        print(name)

        cv2.imwrite(os.path.join('Images/convert.png'), frame) 
        with open("Images/convert.png", "rb") as f:
            encoded_image = base64.b64encode(f.read())
            base64_string = encoded_image.decode("utf-8")
            # print(base64_string)
        post_results(name,age,gender,emotion,base64_string)

    # Display the resulting image
    # cv2.imshow('Video', frame)
    # encoded_string = base64.b64encode(face_roi)
    # print(encoded_string)  
    # Hit 'q' on the keyboard to quit!
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
   
# Release the capture and close all windows
#   video_capture.release()
  cv2.destroyAllWindows()

def post_results(name,age,gender,emotion,encoded_image):
    # * ---------- Initialyse JSON to EXPORT --------- *
    json_to_export = {}
    emotion1 = 0
    emotion2 = 0
    emotion3 = 0
    emotion4 = 0
    emotion5 = 0
    emotion6 = 0

    if emotion=='neutral':
        emotion1=1
        emotion2=0
        emotion3=0
        emotion4=0   
        emotion5=0
        emotion6=0  
    if emotion=='happy':
        emotion1=0
        emotion2=1
        emotion3=0
        emotion4=0
        emotion5=0
        emotion6=0 
    if emotion=='sad':
        emotion1=0
        emotion2=0
        emotion3=1
        emotion4=0
        emotion5=0
        emotion6=0     
    if emotion=='fear':
        emotion1=0
        emotion2=0
        emotion3=0
        emotion4=1
        emotion5=0
        emotion6=0 
    if emotion=='angry':
        emotion1=0
        emotion2=0
        emotion3=0
        emotion4=0
        emotion5=1
        emotion6=0 
    if emotion=='surprise':
        emotion1=0
        emotion2=0
        emotion3=0
        emotion4=0
        emotion5=0
        emotion6=1 

    # * ---------- SAVE data to send to the API -------- *
    json_to_export['name'] = name
    json_to_export['age'] = age
    json_to_export['gender'] = gender
    json_to_export['emotion_neutral'] = emotion1
    json_to_export['emotion_happy'] = emotion2
    json_to_export['emotion_sad'] = emotion3
    json_to_export['emotion_fear'] = emotion4
    json_to_export['emotion_angry'] = emotion5
    json_to_export['emotion_surprised'] = emotion6
    json_to_export['accuracy'] = '50%'
    json_to_export['hour'] = f'{time.localtime().tm_hour}:{time.localtime().tm_min}:{time.localtime().tm_sec}'
    json_to_export['date'] = f'{time.localtime().tm_year}-{time.localtime().tm_mon}-{time.localtime().tm_mday}'
    json_to_export['picture_array'] = encoded_image

    # * ---------- SEND data to API --------- *
    #print("Status: ", json_to_export)
    r = requests.post(url='http://74.225.150.213:5000/receive_data', json=json_to_export)
    print("Status: ", r.status_code)


def highlightFace(net, frame, conf_threshold=0.7):
    frameOpencvDnn=frame.copy()
    frameHeight=frameOpencvDnn.shape[0]
    frameWidth=frameOpencvDnn.shape[1]
    blob=cv2.dnn.blobFromImage(frameOpencvDnn, 1.0, (300, 300), [104, 117, 123], True, False)

    net.setInput(blob)
    detections=net.forward()
    faceBoxes=[]
    for i in range(detections.shape[2]):
        confidence=detections[0,0,i,2]
        if confidence>conf_threshold:
            x1=int(detections[0,0,i,3]*frameWidth)
            y1=int(detections[0,0,i,4]*frameHeight)
            x2=int(detections[0,0,i,5]*frameWidth)
            y2=int(detections[0,0,i,6]*frameHeight)
            faceBoxes.append([x1,y1,x2,y2])
            cv2.rectangle(frameOpencvDnn, (x1,y1), (x2,y2), (0,255,0), int(round(frameHeight/150)), 8)
    return frameOpencvDnn,faceBoxes
