import pyinotify
import os
from firebase import firebase
from datetime import datetime
import re

firebase = firebase.FirebaseApplication('https://intellibrush-f36bf.firebaseio.com')
wm = pyinotify.WatchManager()

mask = pyinotify.IN_CLOSE_WRITE

class EventHandler(pyinotify.ProcessEvent):

	def process_IN_CLOSE_WRITE(self, event):
		print ("In Close Write:", event.pathname)
		f = open(event.pathname, "r")
		json = {}
		json['timestamp'] = str(datetime.now())
		data = []
		for line in f:
			print(line)
			match = re.match(r'(\d)+,(\d)+(.(\d)+)?,(\d)+(.(\d)+)?,(\d)+(.(\d)+)?,(\d)+(.(\d)+)?,(\d)+,(\d)+,(\d)+,(\d)+\n', line)	
			if match == None:
				continue
			line = line[:-1]
			accelid, w, x, y, z, accelx, accely, accelz, ms = line.split(",")
			print(accelid)
			print(w)
			print(x)
			print(y)
			print(z)
			print(accelx)
			print(accely)
			print(accelz)
			print(ms)
			point = {}
			point['accelerometer'] = accelid
			point['w'] = w
			point['x'] = x
			point['y'] = y
			point['z'] = z
			point['xaccel'] = accelx
			point['yaccel'] = accely
			point['zaccel'] = accelz
			point['milliseconds'] = ms
			data.append(point);
		f.close()
		json['data'] = data;
		result = firebase.get('/user/0/', 'session')
		if result == None:
			result = []
		result.append(json)	
		result = firebase.put('/user/0/', 'session', result);
		os.remove(event.pathname)


handler = EventHandler()
notifier = pyinotify.ThreadedNotifier(wm, handler)
notifier.start()

wdd = wm.add_watch('.', mask, rec=True)
#wm.rm_watch(wdd.values())

#notifier.stop()

