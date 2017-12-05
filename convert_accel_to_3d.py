# input data format: accelerometer id (starts with 1 or change line 14), w (not used), x_accel, y_accel, z_accel
with open("./in.txt", "r") as filein:
	with open("./out.json", "w") as fileout:
		fileout.write("{\"points\": [")
		v = [[0, 0, 0], [0, 0, 0]]
		p = [[0, 0, 0], [0, 0, 0]]
		first = True
		for line in filein:
			if first:
				first = False
			else:
				fileout.write(", \n")
			data = line.split(",")
			accel_id = int(data[0]) - 1
			x = float(data[2])
			y = float(data[3])
			z = float(data[4])

			v[accel_id][0] = v[accel_id][0] + x
			v[accel_id][1] = v[accel_id][1] + y
			v[accel_id][2] = v[accel_id][2] + z

			p[accel_id][0] = p[accel_id][0] + v[accel_id][0]
			p[accel_id][1] = p[accel_id][1] + v[accel_id][1]
			p[accel_id][2] = p[accel_id][2] + v[accel_id][2]
			fileout.write("{\"cid\" : \"" + str(accel_id) + "\", \"x\" : \"" + str(x * 100) + "\", \"y\" : \"" + str(y * 100) + "\", \"z\" : \"" + str(z * 100) + "\"}")
		fileout.write("]}")
