# * ---------- IMPORTS --------- *
import io
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
import psycopg2
import cv2
import numpy as np
import re
import base64
import cv2, queue, threading, time
import face_recognition
from deepface import DeepFace  
import math
import argparse
import logging
import requests 
import os 
from PIL import Image
import socketio.client

# Get the relativ path to this file (we will use it later)
FILE_PATH = os.path.dirname(os.path.realpath(__file__))

# * ---------- Create App --------- *
app = Flask(__name__)
CORS(app, support_credentials=True)

# * ---------- DATABASE CONFIG --------- *
DATABASE_USER = 'admin'
DATABASE_PASSWORD = 'password1234'
DATABASE_HOST = '74.225.150.213'
DATABASE_PORT = '5432'
DATABASE_NAME = 'face_detect'

# DATABASE_USER = 'postgres'
# DATABASE_PASSWORD = 'admin'
# DATABASE_HOST = 'localhost'
# DATABASE_PORT = '5432'
# DATABASE_NAME = 'Mood_Board'

def DATABASE_CONNECTION():
    return psycopg2.connect(user=DATABASE_USER,
                              password=DATABASE_PASSWORD,
                              host=DATABASE_HOST,
                              port=DATABASE_PORT,
                              database=DATABASE_NAME)

# * --------------------  ROUTES ------------------- *

# Supporting Methods

def get_insert_data(json_data):
    if request.method == 'POST':
        # Check if the user is already in the DB
        try:
            # Connect to the DB
            connection = DATABASE_CONNECTION()
            cursor = connection.cursor()

            # Query to check if the user as been saw by the camera today
            # f"SELECT * FROM users WHERE current_timestamp = '{json_data['date_time']}' AND name = '{json_data['name']}'"
            user_saw_today_sql_query =\
                f"SELECT * FROM users WHERE date_time = '{json_data['date']}' AND name = '{json_data['name']}'"

            cursor.execute(user_saw_today_sql_query)
            result = cursor.fetchall()
            connection.commit()

            for row in result:
                print(row[8]+int(json_data['emotion_surprised']))

            # If use is already in the DB for today:
            if result:
               print('user IN')
               updated_emotion_happy=row[5]+int(json_data['emotion_happy'])
               updated_emotion_fear=row[6]+int(json_data['emotion_fear'])
               updated_emotion_sad=row[7]+int(json_data['emotion_sad'])
               updated_emotion_surprised=row[8]+int(json_data['emotion_surprised'])
               updated_emotion_neutral=row[9]+int(json_data['emotion_neutral'])
               updated_emotion_angry=row[10]+int(json_data['emotion_angry'])

               update_user_querry = f"UPDATE users SET emotion_happy = '{updated_emotion_happy}',emotion_sad = '{updated_emotion_sad}',emotion_fear = '{updated_emotion_fear}',emotion_surprised = '{updated_emotion_surprised}',emotion_neutral = '{updated_emotion_neutral}',emotion_angry = '{updated_emotion_angry}' WHERE name = '{json_data['name']}' AND date_time = '{json_data['date']}'"
               cursor.execute(update_user_querry)
         
               insert_user_querry_trends = f"INSERT INTO users_trends (name,age,gender,emotion_happy,emotion_sad,emotion_fear,emotion_surprised,emotion_neutral,emotion_angry,accuracy, date_time) VALUES ('{json_data['name']}','{json_data['age']}','{json_data['gender']}','{updated_emotion_happy}','{updated_emotion_sad}','{updated_emotion_fear}','{updated_emotion_surprised}','{updated_emotion_neutral}','{updated_emotion_angry}','{json_data['accuracy']}', current_timestamp)"
               cursor.execute(insert_user_querry_trends)
  
            else:
                print("user OUT")
                # Save image
                
                # Create a new row for the user today:
                insert_user_querry = f"INSERT INTO users (name,age,gender,emotion_happy,emotion_sad,emotion_fear,emotion_surprised,emotion_neutral,emotion_angry,accuracy, date_time, image64) VALUES ('{json_data['name']}','{json_data['age']}','{json_data['gender']}','{json_data['emotion_happy']}','{json_data['emotion_sad']}','{json_data['emotion_fear']}','{json_data['emotion_surprised']}','{json_data['emotion_neutral']}','{json_data['emotion_angry']}','{json_data['accuracy']}', '{json_data['date']}', '{json_data['picture_array']}')"
                cursor.execute(insert_user_querry)

                insert_user_querry_trends = f"INSERT INTO users_trends (name,age,gender,emotion_happy,emotion_sad,emotion_fear,emotion_surprised,emotion_neutral,emotion_angry,accuracy, date_time) VALUES ('{json_data['name']}','{json_data['age']}','{json_data['gender']}','{json_data['emotion_happy']}','{json_data['emotion_sad']}','{json_data['emotion_fear']}','{json_data['emotion_surprised']}','{json_data['emotion_neutral']}','{json_data['emotion_angry']}','{json_data['accuracy']}',current_timestamp)"
                cursor.execute(insert_user_querry_trends)

        except (Exception, psycopg2.DatabaseError) as error:
            print("ERROR DB: ", error)
        finally:
            connection.commit()

            # closing database connection.
            if connection:
                cursor.close()
                connection.close()
                print("PostgreSQL connection is closed")

        # Return user's data to the front
        return jsonify(json_data)

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
    json_to_export['picture_array'] = encoded_image
    json_to_export['date'] = f'{time.localtime().tm_year}-{time.localtime().tm_mon}-{time.localtime().tm_mday}'


    # * ---------- SEND data to API --------- *
    #print("Status: ", json_to_export)
    get_insert_data(json_to_export)
    # print("data",get_all_socket_entries())
    sio.emit('custom-message', str(get_all_socket_entries()))
    # print("data",str(get_all_socket_entries()))

    # r = requests.post(url='http://127.0.0.1:5000/receive_data', json=json_to_export)
    # print("Status: ", r.status_code)


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


# Face Detection Part of the code
def face_detection(cv2,imgdata):

  # Face Detection variable declrations ***************************************

  # Load a sample picture and learn how to recognize it.
  obama_image = face_recognition.load_image_file("files/Jesus.png")
  obama_face_encoding = face_recognition.face_encodings(obama_image)[0]

  # Load a second sample picture and learn how to recognize it.
  biden_image = face_recognition.load_image_file("files/Peter.png")
  biden_face_encoding = face_recognition.face_encodings(biden_image)[0]

  selva_image = face_recognition.load_image_file("files/selva3.jpeg")
  selva_face_encoding = face_recognition.face_encodings(selva_image)[0]

  kanish_image = face_recognition.load_image_file("files/Sg.png")
  kanish_face_encoding = face_recognition.face_encodings(kanish_image)[0]

  narmathaa_image = face_recognition.load_image_file("files/Deigo.png")
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
    "Jesus",
    "Peter",
    "Selva",
    "Sg",
    "Deigo"
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
        # frame = face_recognition.load_image_file('Images/profile.png')
        # Convert frame to grayscale
        img = Image.open(io.BytesIO(imgdata))
        frame= cv2.cvtColor(np.array(img), cv2.COLOR_BGR2RGB)
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        # gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
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
                name = "U"
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
            result = DeepFace.analyze(face_roi, actions=["emotion"], enforce_detection=False)
            # Determine the dominant emotion
            emotion = result[0]['dominant_emotion']
            # # Draw rectangle around face and label with predicted emotion
            #cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)
            cv2.putText(frame, emotion, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)
            #print(result[0]['age']," years old ",result[0]["dominant_race"]," ",result[0]["dominant_emotion"]," ", result[0]["gender"])
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

        # AgeGender part of the code ****************************************
        padding=20
        resultImg,faceBoxes=highlightFace(faceNet,frame)
        if not faceBoxes:
            print("No face detected")

        for faceBox in faceBoxes:
            face=frame[max(0,faceBox[1]-padding):
            min(faceBox[3]+padding,frame.shape[0]-1),max(0,faceBox[0]-padding)
            :min(faceBox[2]+padding, frame.shape[1]-1)]

            blob=cv2.dnn.blobFromImage(face, 1.0, (227,227), MODEL_MEAN_VALUES, swapRB=False)
            genderNet.setInput(blob)
            genderPreds=genderNet.forward()
            gender=genderList[genderPreds[0].argmax()]
            print(f'Gender: {gender}')

            ageNet.setInput(blob)
            agePreds=ageNet.forward()
            age=ageList[agePreds[0].argmax()]
            print(f'Age: {age[1:-1]} years')
            cv2.putText(frame, "           "+gender+"-"+age, (left + 6, bottom - 6), font, 0.5, (255, 255, 255), 1)
            #cv2.putText(resultImg, f'{gender}, {age}', (faceBox[0], faceBox[1]-10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,255), 2, cv2.LINE_AA)
            cv2.imwrite(os.path.join('Images/convert.png'), frame) 
            with open("Images/convert.png", "rb") as f:
                encoded_image = base64.b64encode(f.read())
                base64_string = encoded_image.decode("utf-8")
                # print(base64_string)
        if len(name)>1:   
            post_results(name,age,gender,emotion,base64_string)


        break
   
# Release the capture and close all windows
#   video_capture.release()
  cv2.destroyAllWindows()
    

# * ---------- Get data from the face recognition ---------- *
@app.route('/receive_data', methods=['POST'])
def get_receive_data():
    if request.method == 'POST':
        json_data = request.get_json()

        # Check if the user is already in the DB
        try:
            # Connect to the DB
            connection = DATABASE_CONNECTION()
            cursor = connection.cursor()

            # Query to check if the user as been saw by the camera today
            user_saw_today_sql_query =\
                f"SELECT * FROM users WHERE date_time = '{json_data['date_time']}' OR name = '{json_data['name']}'"

            cursor.execute(user_saw_today_sql_query)
            result = cursor.fetchall()
            connection.commit()

            for row in result:
                print(row[12]+int(json_data['emotion_surprised']))

            # If use is already in the DB for today:
            if result:
               print('user IN')
               updated_emotion_happy=row[7]+int(json_data['emotion_happy'])
               updated_emotion_fear=row[8]+int(json_data['emotion_fear'])
               updated_emotion_sad=row[9]+int(json_data['emotion_sad'])
               updated_emotion_surprised=row[10]+int(json_data['emotion_surprised'])
               updated_emotion_neutral=row[11]+int(json_data['emotion_neutral'])
               updated_emotion_angry=row[12]+int(json_data['emotion_angry'])

               update_user_querry = f"UPDATE users SET emotion_happy = '{updated_emotion_happy}',emotion_sad = '{updated_emotion_sad}',emotion_fear = '{updated_emotion_fear}',emotion_surprised = '{updated_emotion_surprised}',emotion_neutral = '{updated_emotion_neutral}',emotion_angry = '{updated_emotion_angry}' WHERE name = '{json_data['name']}' AND date_time = current_timestamp"
               cursor.execute(update_user_querry)
         
               insert_user_querry_trends = f"INSERT INTO users_trends (name,age,gender,emotion_happy,emotion_sad,emotion_fear,emotion_surprised,emotion_neutral,emotion_angry,accuracy, date_time) VALUES ('{json_data['name']}','{json_data['age']}','{json_data['gender']}','{updated_emotion_happy}','{updated_emotion_sad}','{updated_emotion_fear}','{updated_emotion_surprised}','{updated_emotion_neutral}','{updated_emotion_angry}','{json_data['accuracy']}', current_timestamp)"
               cursor.execute(insert_user_querry_trends)
  
            else:
                print("user OUT")
                # Save image
                
                # Create a new row for the user today:
                insert_user_querry = f"INSERT INTO users (name,age,gender,emotion_happy,emotion_sad,emotion_fear,emotion_surprised,emotion_neutral,emotion_angry,accuracy, date_time, image64) VALUES ('{json_data['name']}','{json_data['age']}','{json_data['gender']}','{json_data['emotion_happy']}','{json_data['emotion_sad']}','{json_data['emotion_fear']}','{json_data['emotion_surprised']}','{json_data['emotion_neutral']}','{json_data['emotion_angry']}','{json_data['accuracy']}', current_timestamp, '{json_data['picture_array']}')"
                cursor.execute(insert_user_querry)

                insert_user_querry_trends = f"INSERT INTO users_trends (name,age,gender,emotion_happy,emotion_sad,emotion_fear,emotion_surprised,emotion_neutral,emotion_angry,accuracy, date_time) VALUES ('{json_data['name']}','{json_data['age']}','{json_data['gender']}','{json_data['emotion_happy']}','{json_data['emotion_sad']}','{json_data['emotion_fear']}','{json_data['emotion_surprised']}','{json_data['emotion_neutral']}','{json_data['emotion_angry']}','{json_data['accuracy']}',current_timestamp)"
                cursor.execute(insert_user_querry_trends)

        except (Exception, psycopg2.DatabaseError) as error:
            print("ERROR DB: ", error)
        finally:
            connection.commit()

            # closing database connection.
            if connection:
                cursor.close()
                connection.close()
                print("PostgreSQL connection is closed")

        # Return user's data to the front
        return jsonify(json_data)


# * ---------- Get data from the face recognition ---------- *
@app.route('/receive_image', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_receive_image():
    if request.method == 'POST':
        json_data = request.get_json()
        # print('RECEIVE_IMAGE',json_data['image64'])
        imgdata = base64.b64decode(json_data['image64'])       
        with open('Images/profile.png', "wb") as f: 
            f.write(imgdata)
         
        face_detection(cv2,imgdata)
        # cv2.imwrite(os.path.join('Images/convert.png'), json_data['image64']) 
        # Return user's data to the front
        return jsonify(json_data)


# * ---------- Get all the data of an employee ---------- *
@app.route('/get_employee/<string:name>', methods=['GET'])
def get_employee(name):
    answer_to_send = {}
    # Check if the user is already in the DB
    try:
        # Connect to DB
        connection = DATABASE_CONNECTION()
        cursor = connection.cursor()
        # Query the DB to get all the data of a user:
        user_information_sql_query = f"SELECT * FROM users WHERE name = '{name}'"

        cursor.execute(user_information_sql_query)
        result = cursor.fetchall()
        connection.commit()

        # if the user exist in the db:
        if result:
            #print('RESULT: ',result)
            # Structure the data and put the dates in string for the front
            for k,v in enumerate(result):
                answer_to_send[k] = {}
                for ko,vo in enumerate(result[k]):
                    answer_to_send[k][ko] = str(vo)
            print('answer_to_send: ', answer_to_send)
        else:
            answer_to_send = {'error': 'User not found...'}

    except (Exception, psycopg2.DatabaseError) as error:
        print("ERROR DB: ", error)
    finally:
        # closing database connection:
        if (connection):
            cursor.close()
            connection.close()

    # Return the user's data to the front
    return jsonify(answer_to_send)


# * --------- Get the 5 last users seen by the camera --------- *
@app.route('/get_users_data', methods=['GET'])
def get_5_last_entries():
    answer_to_send = []
    # Check if the user is already in the DB
    try:
        # Connect to DB
        connection = DATABASE_CONNECTION()
        cursor = connection.cursor()
        list_cursor = connection.cursor()

        # Query the DB to get all the data of a user:
        lasts_entries_sql_query = f"SELECT * FROM users"
        cursor.execute(lasts_entries_sql_query)
        result = list(cursor.fetchall())

        # Query the DB to get all line chart datas
        line_sql_query = f"SELECT to_char(date_time, 'YYYY-MM-DD') as arrival_date, to_char(date_time, 'HH12:MI:SS AM') as arrival_time,sum(emotion_happy) as happy,sum(emotion_surprised) as fear,sum(emotion_sad) as sad,sum(emotion_fear) as surprised,sum(emotion_angry) as angry FROM public.users_trends group by date_time order by date_time"
        list_cursor.execute(line_sql_query)
        list_result = list(list_cursor.fetchall())

        connection.commit()

        # if DB is not empty:
        if result:
            #print(result)
            # print(list_result)
            
            # Structure the data and put the dates in string for the front
            keyss=['name','picture','gender','accuracy','age','emotion_happy','emotion_fear','emotion_sad','emotion_surprised','emotion_neutral','emotion_angry','image64','date_time']
            for k, v in enumerate(result):
                answer_to_send_new = {}
                for ko, vo in enumerate(result[k]):
                    answer_to_send_new[keyss[ko]] = str(vo)
                answer_to_send.append(answer_to_send_new) 
        else:
            answer_to_send = {'error': 'error detect'}

        # IT"S FOR LINE CHART if DB is not empty:
        if list_result:
            # print(result)
            # Structure the data and put the dates in string for the front
            # keyss=['emotion_happy','emotion_fear','emotion_sad','emotion_surprised','emotion_neutral','emotion_angry']
            answer_to_chart=[]
            for k, v in enumerate(list_result):
                answer_to_chart_new = []
                for ko, vo in enumerate(list_result[k]):
                    answer_to_chart_new[ko] = str(vo)
                answer_to_chart.append(answer_to_chart_new)
        else:
            answer_to_chart = {'error': 'error detect'}

        list_response={'answer_to_send':answer_to_send,'answer_to_chart':answer_to_chart}

    except (Exception, psycopg2.DatabaseError) as error:
        print("ERROR DB: ", error)
    finally:
        # closing database connection:
        if (connection):
            cursor.close()
            list_cursor.close()
            connection.close()

    # Return the user's data to the front
    return jsonify(list_response)

def get_all_socket_entries():
    answer_to_send = []
    # Check if the user is already in the DB
    try:
        # Connect to DB
        connection = DATABASE_CONNECTION()
        cursor = connection.cursor()
        list_cursor = connection.cursor()

        # Query the DB to get all the data of a user:
        lasts_entries_sql_query = f"SELECT * FROM users"
        cursor.execute(lasts_entries_sql_query)
        result = list(cursor.fetchall())

        # Query the DB to get all line chart datas
        # line_sql_query = f"SELECT to_char(date_time, 'YYYY-MM-DD') as arrival_date, to_char(date_time, 'HH12:MI:SS AM') as arrival_time,sum(emotion_happy) as happy,sum(emotion_surprised) as fear,sum(emotion_sad) as sad,sum(emotion_fear) as surprised,sum(emotion_angry) as angry FROM public.users_trends group by date_time order by date_time"
        line_sql_query = f"SELECT to_char(date_time, 'YYYY-MM-DD') as arrival_date, to_char(date_time, 'HH12:MI:SS AM') as arrival_time,sum(emotion_happy) as happy,sum(emotion_surprised) as fear,sum(emotion_sad) as sad, sum(emotion_fear) as surprised,sum(emotion_angry) as angry FROM public.users_trends WHERE date_time >= (current_timestamp - (50 ||' seconds')::interval) AND date_time <  current_timestamp group by date_time, arrival_date, arrival_time order by date_time"

        list_cursor.execute(line_sql_query)
        list_result = list(list_cursor.fetchall())

        connection.commit()

        # if DB is not empty:
        if result:
            #print(result)
            # print(list_result)
            
            # Structure the data and put the dates in string for the front
            keyss=['name','picture','gender','accuracy','age','emotion_happy','emotion_fear','emotion_sad','emotion_surprised','emotion_neutral','emotion_angry','image64','date_time']
            for k, v in enumerate(result):
                answer_to_send_new = {}
                for ko, vo in enumerate(result[k]):
                    answer_to_send_new[keyss[ko]] = str(vo)
                answer_to_send.append(answer_to_send_new) 
        else:
            answer_to_send = {'error': 'error detect'}

        # IT"S FOR LINE CHART if DB is not empty:
        if list_result:
            # print(result)
            # Structure the data and put the dates in string for the front
            # keyss=['emotion_happy','emotion_fear','emotion_sad','emotion_surprised','emotion_neutral','emotion_angry']
            answer_to_chart=[]
            for k, v in enumerate(list_result):
                answer_to_chart_new = {}
                for ko, vo in enumerate(list_result[k]):
                    answer_to_chart_new[str(ko)] = str(vo)
                answer_to_chart.append(answer_to_chart_new)
                print("answer_to_chart",answer_to_chart)
        else:
            answer_to_chart = {'error': 'error detect'}

        list_response={'answer_to_send':answer_to_send,'answer_to_chart':answer_to_chart}

    except (Exception, psycopg2.DatabaseError) as error:
        print("ERROR DB: ", error)
    finally:
        # closing database connection:
        if (connection):
            cursor.close()
            list_cursor.close()
            connection.close()

    # Return the user's data to the front
    return list_response

                                 
# * -------------------- RUN SERVER -------------------- *
if __name__ == '__main__':
    # * --- DEBUG MODE: --- *
    # app.run(host='127.0.0.1', port=5000, debug=True)
    #  * --- DOCKER PRODUCTION MODE: --- *
    sio = socketio.Client()
    sio.connect('http://20.204.226.52:9002/')
    # sio.wait()
    @sio.event
    def connect():
        print('connected to server')
    @sio.event
    def disconnect():
        print('disconnected from server')
    # @sio.on('custom-message')
    # def hello(a):
    #     print(a)
    # * --- DEBUG MODE: --- *
    app.run(host='0.0.0.0', port=5000)
    # app.run(host='0.0.0.0', port=os.environ['PORT']) -> DOCKER
    # app.run(host='127.0.0.1', port=5000, debug=True)


