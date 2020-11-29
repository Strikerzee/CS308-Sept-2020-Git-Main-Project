# Vital info:
# Creds file: 'Timetable assist-89d765448b38.json'
# Name of spreadsheet
# Index of worksheet, usually 0th index
from typing import Generic, TypeVar, Dict, List, Optional
from abc import ABC, abstractmethod
import pandas as pd
import math
import gspread
import pandas as pd
from oauth2client.service_account import ServiceAccountCredentials
import flask
from flask import request
from itertools import zip_longest
# define the scope
scope = ['https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/drive']

# add credentials to the account
creds = ServiceAccountCredentials.from_json_keyfile_name('Timetable assist-89d765448b38.json', scope)

clashMatrix: Dict[str, List[str]] = {}
# authorize the clientsheet 
client = gspread.authorize(creds)
# get the instance of the Spreadsheet
sheet = client.open('Course slotting')

V = TypeVar('V') # variable type
D = TypeVar('D') # domain type

app = flask.Flask(__name__)
app.config["DEBUG"] = True
with app.test_request_context('/update', method='PUT'):
    assert request.path == '/update'
    assert request.method == 'PUT'

@app.route('/', methods=['GET'])
def home():
    # Data sources
    sheet_instance_instructors = sheet.get_worksheet(1)
    sheet_instance_groups = sheet.get_worksheet(2)

    df_instructors = pd.DataFrame.from_dict(sheet_instance_instructors.get_all_records())
    df_groups = pd.DataFrame.from_dict(sheet_instance_groups.get_all_records())

    instructor_to_courses_map = (df_instructors.groupby('Instructor')
       .apply(lambda x: list(x['Course code']))
       .to_dict())

    course_to_instructor_map = (df_instructors.groupby('Course code')
       .apply(lambda x: list(x['Instructor']))
       .to_dict())

    # print(instructor_to_courses_map)
    # print(course_to_instructor_map)

    # Store in variables
    course_list = df_instructors['Course code'].tolist()

    variables: List[str] = course_list

    for course in course_list:
        clashMatrix[course] = []

    # Instructors
    for course in course_list:
        for clash_course in instructor_to_courses_map[course_to_instructor_map[course][0]]:
            if clash_course not in clashMatrix[course] and course < clash_course:
                clashMatrix[course].append(clash_course)

    # Core/Elective groups
    splitting = df_groups.to_dict('split')
    for splitting_item in splitting['data']:
        while("" in splitting_item):
            splitting_item.remove("")

    # print(splitting['data'])

    for listc in splitting['data']:
        for course in listc:
            for clash_course in listc:
                if clash_course not in clashMatrix[course] and course < clash_course:
                    clashMatrix[course].append(clash_course)

    print(clashMatrix)
    return 'Welcome. Go to /endpoint to get the clash matrix.'

@app.route('/endpoint', methods=['GET'])
def api_all():
    return clashMatrix

@app.route('/update', methods=['PUT'])
def api_put():
    slot_count = 8
    sheet_instance_timetable = sheet.get_worksheet(0)
    m = []
    for i in range(slot_count):
        temp = []
        temp.append(chr(ord('A')+i))
        m.append(temp)
    # json_data = request.get_json()
    json_data = {'A':['HS529', 'HS519', 'HS559'], 'B':['CS529', 'CS519', 'CS559'], 'C':[], 'D':[], 'E':[], 'F':[], 'G':[], 'H':[]}
    for i in range(slot_count):
        m[i] = m[i] + json_data[chr(ord('A')+i)]
    print(m)
    rez = [list(filter(None,i)) for i in zip_longest(*m)]
    sheet_instance_timetable.clear()
    sheet_instance_timetable.update('A1:AA50', rez)
    return 'Updated\n'

if __name__ == "__main__":
    app.run()