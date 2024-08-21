# * ---------- IMPORTS --------- *
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
import psycopg2
import cv2
import numpy as np
import re


# Get the relativ path to this file (we will use it later)
FILE_PATH = os.path.dirname(os.path.realpath(__file__))

# * ---------- Create App --------- *
app = Flask(__name__)
CORS(app, support_credentials=True)



# * ---------- DATABASE CONFIG --------- *
DATABASE_USER = 'postgres'
DATABASE_PASSWORD = 'admin'
DATABASE_HOST = 'localhost'
DATABASE_PORT = '5432'
DATABASE_NAME = 'Mood_Board'

def DATABASE_CONNECTION():
    return psycopg2.connect(user=DATABASE_USER,
                              password=DATABASE_PASSWORD,
                              host=DATABASE_HOST,
                              port=DATABASE_PORT,
                              database=DATABASE_NAME)



# * --------------------  ROUTES ------------------- *
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
                f"SELECT * FROM users WHERE date = '{json_data['date']}' AND name = '{json_data['name']}'"

            cursor.execute(user_saw_today_sql_query)
            result = cursor.fetchall()
            connection.commit()

            for row in result:
                print(row[12]+int(json_data['emotion_surprised']))

            # If use is already in the DB for today:
            if result:
               print('user IN')
               updated_emotion_happy=row[7]+int(json_data['emotion_happy'])
               updated_emotion_sad=row[8]+int(json_data['emotion_sad'])
               updated_emotion_fear=row[9]+int(json_data['emotion_fear'])
               updated_emotion_surprised=row[10]+int(json_data['emotion_surprised'])
               updated_emotion_neutral=row[11]+int(json_data['emotion_neutral'])
               updated_emotion_angry=row[12]+int(json_data['emotion_angry'])

               update_user_querry = f"UPDATE users SET emotion_happy = '{updated_emotion_happy}',emotion_sad = '{updated_emotion_sad}',emotion_fear = '{updated_emotion_fear}',emotion_surprised = '{updated_emotion_surprised}',emotion_neutral = '{updated_emotion_neutral}',emotion_angry = '{updated_emotion_angry}' WHERE name = '{json_data['name']}' AND date = '{json_data['date']}'"
               cursor.execute(update_user_querry)

            #    image_path = f"{FILE_PATH}/assets/img/{json_data['date']}/{json_data['name']}/departure.jpg"
            #     # Save image
            #    os.makedirs(f"{FILE_PATH}/assets/img/{json_data['date']}/{json_data['name']}", exist_ok=True)
            #    cv2.imwrite(image_path, np.array(json_data['picture_array']))
            #    json_data['picture_path'] = image_path

                # Update user in the DB
            #    get_existing_emotions=\
            #     f"SELECT emotions FROM users WHERE date = '{json_data['date']}' AND name = '{json_data['name']}'"
            #    updated_emotions=get_existing_emotions+","+json_data['emotions']}'


            #    if json_data['emotion_happy']=='happy':
            #         updated_emotion=result.__getattribute__.emotion_happy+1
            #         update_user_querry = f"UPDATE users SET emotion_happy = '{updated_emotion}' WHERE name = '{json_data['name']}' AND date = '{json_data['date']}'"
            #         cursor.execute(update_user_querry)

            #    if json_data['emotions']=='fear':
            #         updated_emotion=result.__getattribute__.emotion_fear+1
            #         update_user_querry = f"UPDATE users SET emotion_fear = '{updated_emotion}' WHERE name = '{json_data['name']}' AND date = '{json_data['date']}'"
            #         cursor.execute(update_user_querry)
            
            #    if json_data['emotions']=='sad':
            #         updated_emotion=result.__getattribute__.emotion_sad+1
            #         update_user_querry = f"UPDATE users SET emotion_sad = '{updated_emotion}' WHERE name = '{json_data['name']}' AND date = '{json_data['date']}'"
            #         cursor.execute(update_user_querry)
        
            #    if json_data['emotions']=='surprised':
            #         updated_emotion=result.__getattribute__.emotion_surprised+1
            #         update_user_querry = f"UPDATE users SET emotion_surprised = '{updated_emotion}' WHERE name = '{json_data['name']}' AND date = '{json_data['date']}'"
            #         cursor.execute(update_user_querry)

            else:
                print("user OUT")
                # Save image
                
                # Create a new row for the user today:
                insert_user_querry = f"INSERT INTO users (name,age,gender,emotion_happy,emotion_sad,emotion_fear,emotion_surprised,emotion_neutral,emotion_angry,accuracy, date, arrival_time, image64) VALUES ('{json_data['name']}','{json_data['age']}','{json_data['gender']}','{json_data['emotion_happy']}','{json_data['emotion_sad']}','{json_data['emotion_fear']}','{json_data['emotion_surprised']}','{json_data['emotion_neutral']}','{json_data['emotion_angry']}','{json_data['accuracy']}', '{json_data['date']}', '{json_data['hour']}', '{json_data['picture_array']}')"
                cursor.execute(insert_user_querry)

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
            print('RESULT: ',result)
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
        # Query the DB to get all the data of a user:
        lasts_entries_sql_query = f"SELECT * FROM users"

        cursor.execute(lasts_entries_sql_query)
        result = list(cursor.fetchall())
        connection.commit()

        # if DB is not empty:
        if result:
            # print(result)
            # answer_to_send.append({'Karthee':'Value'})        
            # print(answer_to_send)

            # Structure the data and put the dates in string for the front
            keyss=['name','date',"time",'picture','gender','accuracy','age','emotion_happy','emotion_fear','emotion_sad','emotion_surprised','emotion_neutral','emotion_angry','image64']
            for k, v in enumerate(result):
                answer_to_send_new = {}
                for ko, vo in enumerate(result[k]):
                    answer_to_send_new[keyss[ko]] = str(vo)
                answer_to_send.append(answer_to_send_new) 

        else:
            answer_to_send = {'error': 'error detect'}

    except (Exception, psycopg2.DatabaseError) as error:
        print("ERROR DB: ", error)
    finally:
        # closing database connection:
        if (connection):
            cursor.close()
            connection.close()

    # Return the user's data to the front
    return jsonify(answer_to_send)


# * ---------- Add new employee ---------- *
@app.route('/add_employee', methods=['POST'])
@cross_origin(supports_credentials=True)
def add_employee():
    try:
        # Get the picture from the request
        image_file = request.files['image']
        print(request.form['nameOfEmployee'])

        # Store it in the folder of the know faces:
        file_path = os.path.join(f"assets/img/users/{request.form['nameOfEmployee']}.jpg")
        image_file.save(file_path)
        answer = 'new employee succesfully added'
    except:
        answer = 'Error while adding new employee. Please try later...'
    return jsonify(answer)


# * ---------- Get employee list ---------- *
@app.route('/get_employee_list', methods=['GET'])
def get_employee_list():
    employee_list = {}

    # Walk in the user folder to get the user list
    walk_count = 0
    for file_name in os.listdir(f"{FILE_PATH}/assets/img/users/"):
        # Capture the employee's name with the file's name
        name = re.findall("(.*)\.jpg", file_name)
        if name:
            employee_list[walk_count] = name[0]
        walk_count += 1

    return jsonify(employee_list)


# * ---------- Delete employee ---------- *
@app.route('/delete_employee/<string:name>', methods=['GET'])
def delete_employee(name):
    try:
        # Remove the picture of the employee from the user's folder:
        print('name: ', name)
        file_path = os.path.join(f'assets/img/users/{name}.jpg')
        os.remove(file_path)
        answer = 'Employee succesfully removed'
    except:
        answer = 'Error while deleting new employee. Please try later'

    return jsonify(answer)


                                 
# * -------------------- RUN SERVER -------------------- *
if __name__ == '__main__':
    # * --- DEBUG MODE: --- *
    app.run(host='127.0.0.1', port=5000, debug=True)
    #  * --- DOCKER PRODUCTION MODE: --- *
    # app.run(host='0.0.0.0', port=os.environ['PORT']) -> DOCKER
