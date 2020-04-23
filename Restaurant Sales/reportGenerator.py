import os
import csv
import itertools
import collections
import datetime
import requests
import time
import xml.etree.ElementTree as ET
from progressbar import ProgressBar

#####################
# Helper Functions
#####################
def skip(iterable, at_start=0, at_end=0):
    it = iter(iterable)
    for x in itertools.islice(it, at_start):
        pass
    queue = collections.deque(itertools.islice(it, at_end))
    for x in it:
        queue.append(x)
        yield queue.popleft()
def Extract(lst, index): 
    return [item[index] for item in lst] 
def getDayofWeek(date):
    return date.weekday()
def find_csv_filenames( path_to_dir, suffix=".csv" ):
    filenames = os.listdir(path_to_dir)
    return [ filename for filename in filenames if filename.endswith( suffix ) ]
def fliterNumber(number):
    return float(number.replace("$","").replace("%","").replace(",",""))
def findWeek(date):
    return (date.day-1)//7+1
def unixTime(date):
    return int(time.mktime(date.timetuple()))
def simpleDateFormat(date):
    return str(date.year)+'-'+str(date.month)+'-'+str(date.day)
def getDayTemp(date):
    # Python program to find current  
    # weather details of any city 
    # using worldweatheronline api 

    # Enter your API key here 
    apiKey = "ba0fed18fa654735b9150225201804"
    
    # base_url variable to store url 
    baseUrl = "http://api.worldweatheronline.com/premium/v1/past-weather.ashx?"
    
    # Give city name 
    # city_name = input("Enter city name : ") 
    cityName ="Moreno+Valley"
    stateName = 'ca'

    dateFormat = '2009-07-20'
    dateFormat = str(date.year)+'-'+str(date.month)+'-'+str(date.day)
    # print("Temperature for "+dateFormat+ " found")
    
    
    # complete_url variable to store 
    # complete url address 
    completeUrl = baseUrl + "q=" + cityName + "," + stateName + ""+ "&date=" + dateFormat + "&key=" + apiKey
    # get method of requests module 
    # return response object 
    response = requests.get(completeUrl) 
    
    # json method of response object  
    # convert json format data into 
    # python format data 
    root = ET.fromstring(response.content)
    for child in root.iter('hourly'):
        # print (child.tag, child.attrib)
        if child.find('time').text == '1200':
            # print("-------------------")
            # print("Temperature for "+dateFormat+ " found")
            # print("-------------------")
            # print(child.find('tempC').text)
            return child.find('tempC').text



#####################
# Report Categories
#####################
names = []
sold = []
refunded = []
grossSales = [] 
discounts = []
refunds = []
netSales = [] 
percentNetSales = [] 
avgNetSales = [] 
cogs = []
grossProfit = []
dayofWeek = []
weekend = []
weekOfMonth = []
dayTemperature = []
itemDate = []
# Defaults
monthsDefault = ['October', 'December', 'February', 'January', 'November']
ITEM_NAMES = []

#####################
# Iterate through month folders
#####################
reportDir = os.getcwd()
months = next(os.walk(reportDir))[1]
# Filters folders based on monthsDefault
months = [x for x in monthsDefault if x in months]

# Get complete list of all items
for month in months:
    monthDir = reportDir + "/" + month
    days = find_csv_filenames(monthDir)
    print("Getting Item Names")
    pbar = ProgressBar()
    for day in pbar(days):
        dayDir = monthDir + '/' + day
        with open(dayDir, 'r') as f:
            f = skip(f, 16, 1)
            reader = csv.DictReader(f)
            for row in reader:
                ITEM_NAMES.append(row.get('Name'))

ITEM_NAMES = set(ITEM_NAMES)

for month in months:
    monthDir = reportDir + "/" + month
    print("\n"+month+": Formatting and Retriving data")
    days = find_csv_filenames(monthDir)
    pbar = ProgressBar()
    
    
    for day in pbar(days):
        itemReference = ITEM_NAMES.copy()
        
        date = datetime.datetime(int(day[53:-4]), int(day[47:-12]), int(day[50:-9]), 12)
        dayTemp = getDayTemp(date)
        # dayTemp = 0
        weekendValue = 0
        if getDayofWeek(date) == (0 or 5 or 6) :
            weekendValue = 1

        dayDir = monthDir + '/' + day
        #####################
        # Grab Data From File
        #####################
        with open(dayDir, 'r') as f:
            f = skip(f, 16, 1)
            reader = csv.DictReader(f)
            for row in reader:
                if row.get('Name') in itemReference: itemReference.remove(row.get('Name'))
                names.append(row.get('Name'))
                sold.append(fliterNumber(row.get('Sold')))
                refunded.append(fliterNumber(row.get('Refunded')))
                grossSales.append(fliterNumber(row.get('Gross Sales'))) 
                discounts.append(fliterNumber(row.get('Discounts')))
                refunds.append(fliterNumber(row.get('Refunds')))
                netSales.append(fliterNumber(row.get('Net Sales'))) 
                percentNetSales.append(fliterNumber(row.get('% Net Sales'))) 
                avgNetSales.append(fliterNumber(row.get('Avg Net Sales'))) 
                cogs.append(fliterNumber(row.get('COGS')))
                grossProfit.append(fliterNumber(row.get('Gross Profit')))
                dayofWeek.append(getDayofWeek(date))
                weekend.append(weekendValue)
                weekOfMonth.append(findWeek(date))
                dayTemperature.append(dayTemp)
                itemDate.append(simpleDateFormat(date))
            # Add days that you didn't sale
            for missingItem in itemReference:
                names.append(missingItem)
                sold.append(0)
                refunded.append(0)
                grossSales.append(0) 
                discounts.append(0)
                refunds.append(0)
                netSales.append(0) 
                percentNetSales.append(0) 
                avgNetSales.append(0) 
                cogs.append(0)
                grossProfit.append(0)
                dayofWeek.append(getDayofWeek(date))
                weekend.append(weekendValue)
                weekOfMonth.append(findWeek(date))
                dayTemperature.append(dayTemp)
                itemDate.append(simpleDateFormat(date))


#####################
# Make Report Folder
#####################
reportFolder = reportDir + "/report"
if not os.path.exists(reportFolder):
    os.mkdir(reportFolder)

# Get Unique items

itemIndices = []

# Get Index of where the same item shows up
for item in ITEM_NAMES:
    indices = [i for i, s in enumerate(names) if item in s]
    itemIndices.append(indices)

    
for index, itemName in enumerate(ITEM_NAMES):
    with open( reportFolder+'/'+ itemName.replace("/","&") +'.csv', 'w') as f:
        writer = csv.writer(f)
        completeItemData = []
        for instance in itemIndices[index]:
            instanceData = Extract([names,sold,refunded,grossSales, discounts,refunds,netSales, percentNetSales, avgNetSales, cogs,dayofWeek,weekend,weekOfMonth,dayTemperature,grossProfit, itemDate], instance)
            completeItemData.append(instanceData)
        
        header = ['Name','Sold','Refunded','Gross Sales', 'Discounts','Refunds','Net Sales', '% Net Sales', 'Avg Net Sales', 'COGS','Day of Week',"Weekend","Week of Month",'Day Temperature Cel','Gross Profit', 'Date']
        writeData = [header]
        writeData.extend(completeItemData)
        writer.writerows(writeData)



print("-------------------")
print('Completed')
print("-------------------")
print("Items Filtered: " + str(len(names)))