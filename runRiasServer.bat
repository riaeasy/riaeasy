﻿rem 需要 java 8+


start java -server -Xms512m -Xmx512m -XX:MetaspaceSize=16m -XX:MaxMetaspaceSize=256m -jar -Dfile.encoding=utf-8 RSServer.jar
