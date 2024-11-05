from django.shortcuts import render
import json
from django.http import JsonResponse
from JoDate.database import *
from JoDate.menu import *
# Create your views here.

def home(request):
    return render(request,"base.html")

# 登入驗證
def login(request):
    if request.method == "POST":
        json_dict = json.loads(request.body.decode('utf-8'))
        result = loginUser(json_dict)
        return JsonResponse(result)
    return JsonResponse({'Error': 'The resource was not found'}, status=404)

# 註冊
def register(request):
    if request.method == "POST":
        json_dict = json.loads(request.body.decode('utf-8'))
        result = createUser(json_dict)
        return JsonResponse(result)
    return JsonResponse({'Error': 'The resource was not found'}, status=404)

# 更新使用者
def modifyUser(request):
    if request.method == "POST":
        json_dict = json.loads(request.body.decode('utf-8'))
        result = updateUser(json_dict)
        return JsonResponse(result)
    return JsonResponse({'Error': 'The resource was not found'}, status=404)

# 更新使用者密碼
def changePassword(request):
    if request.method == "POST":
        json_dict = json.loads(request.body.decode('utf-8'))
        result = updatePassword(json_dict)
        return JsonResponse(result)
    return JsonResponse({'Error': 'The resource was not found'}, status=404)

# 刪除使用者
def removeUser(request):
    if request.method == "POST":
        json_dict = json.loads(request.body.decode('utf-8'))
        result = deleteUser(json_dict)
        return JsonResponse(result)
    return JsonResponse({'Error': 'The resource was not found'}, status=404)

# 更新使用者
def getUserInfo(request):
    if request.method == "POST":
        json_dict = json.loads(request.body.decode('utf-8'))
        result = getUser(json_dict)
        return JsonResponse(result)
    return JsonResponse({'Error': 'The resource was not found'}, status=404)

# 顯示使用者的所有群組
def getUserGroups(request):
    if request.method == "POST":
        json_dict = json.loads(request.body.decode('utf-8'))
        result = getAllUserGroups(json_dict)
        return JsonResponse(result)
    return JsonResponse({'Error': 'The resource was not found'}, status=404)

# 建立群組
def grouping(request):
    if request.method == "POST":
        json_dict = json.loads(request.body.decode('utf-8'))
        result = createGroup(json_dict)
        return JsonResponse(result)
    return JsonResponse({'Error': 'The resource was not found'}, status=404)

# 更新群組
def modifyGroup(request):
    if request.method == "POST":
        json_dict = json.loads(request.body.decode('utf-8'))
        result = updateGroup(json_dict)
        return JsonResponse(result)
    return JsonResponse({'Error': 'The resource was not found'}, status=404)

# 更新群組的人數
def modifyAttendance(request):
    if request.method == "POST":
        json_dict = json.loads(request.body.decode('utf-8'))
        result = updateAttendance(json_dict)
        return JsonResponse(result)
    return JsonResponse({'Error': 'The resource was not found'}, status=404)

# 顯示單一群組
def getGroupInfo(request):
    if request.method == "POST":
        json_dict = json.loads(request.body.decode('utf-8'))
        result = getGroupbyID(json_dict)
        return JsonResponse(result)
    return JsonResponse({'Error': 'The resource was not found'}, status=404)

# 顯示所有群組
def getAllGroups(request):
    if request.method == "POST":
        json_dict = json.loads(request.body.decode('utf-8'))
        result = getGroups(json_dict)
        return JsonResponse(result)
    return JsonResponse({'Error': 'The resource was not found'}, status=404)

# 特定使用者是否在群組內
def checkAttendance(request):
    if request.method == "POST":
        json_dict = json.loads(request.body.decode('utf-8'))
        result = getAttendanceStatus(json_dict)
        return JsonResponse(result)
    return JsonResponse({'Error': 'The resource was not found'}, status=404)

# 檢查組團是否過期
def checkGroupStatus(request):
    if request.method == "POST":
        result = updateGroupStatus()
        # If safe is True and a non-dict object is passed as the first argument, a TypeError will be raised
        return JsonResponse(result, safe=False)
    return JsonResponse({'Error': 'The resource was not found'}, status=404)