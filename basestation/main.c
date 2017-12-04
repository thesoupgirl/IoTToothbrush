/*----------------------------------------------------------------------*/
/* FatFs sample project for generic microcontrollers (C)ChaN, 2012      */
/*----------------------------------------------------------------------*/

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <bcm2835.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <string.h>

#include "ff.h"

#define 	ReadBrushConnection()			bcm2835_gpio_lev(RPI_GPIO_P1_24)
#define		LOG_FILE_DIR						"../LogFiles"

FATFS Fatfs;		/* File system object */
FIL Fil;			/* File object */
BYTE Buff[128];		/* File read buffer */


void die (		/* Stop with dying message */
	FRESULT rc	/* FatFs return value */
)
{
	printf("Failed with rc=%u.\n", rc);
	exit(0);
}

void InitializeSD()
{
	FRESULT rc;				/* Result code */
	DIR dir;				/* Directory object */
	FILINFO fno;			/* File information object */
	UINT bw, br, u32i, u32j;
	UINT u32val[3]={121, 253, 199};
    char unitval, tensval, hundredval;
    int fileNum = 0;
    char fileName[5];
    char fullFilePath[25];

	f_mount(0, &Fatfs);		/* Register volume work area (never fails) */

    struct stat st = {0};
    if(stat(LOG_FILE_DIR, &st) == -1)
    {
    	mkdir(LOG_FILE_DIR, 0700);
    }

    while(1)
    {
		printf("\nOpening data file %d\n", fileNum);
		sprintf(fileName, "%d", fileNum);
		rc = f_open(&Fil, fileName, FA_READ);
		if (rc) die(rc);

		strcpy(fullFilePath, LOG_FILE_DIR);
		strcat(fullFilePath, "/");
		strcat(fullFilePath, fileName);
		FILE* fp = fopen(fullFilePath, "w+");

		printf("\nType the file content.\n");
		for (;;) {
			rc = f_read(&Fil, Buff, sizeof Buff, &br);	/* Read a chunk of file */
			if (rc || !br)
			{
				printf("%d\n", rc);
				break;
			}			/* Error or end of file */
			fwrite(Buff, 1, sizeof(Buff), fp);
		}
		if (rc) die(rc);

		printf("\nClose the file.\n");
		rc = f_close(&Fil);
		f_unlink(fileName);
		if (rc) die(rc);
		fclose(fp);
		fileNum++;
    }

	printf("\nTest completed.\n");
}



/*-----------------------------------------------------------------------*/
/* Program Main                                                          */
/*-----------------------------------------------------------------------*/

int u32flag;
int main (void)
{
	printf("Before setup pin\n");
	bcm2835_init();
	//Setup input pin
	bcm2835_gpio_fsel(RPI_GPIO_P1_24, BCM2835_GPIO_FSEL_INPT); // Connection
	printf("After setup pin\n");
	while(1)
	{
		int pinValue = ReadBrushConnection();
		printf("Pin Value: %d\n", pinValue);
		if(ReadBrushConnection())
		{
			InitializeSD();
		}
		else
		{
			sleep(5);
		}
	}
}


/*---------------------------------------------------------*/
/* User Provided Timer Function for FatFs module           */
/*---------------------------------------------------------*/

DWORD get_fattime (void)
{
	return	  ((DWORD)(2017 - 1980) << 25)	/* Year = 2012 */
			| ((DWORD)1 << 21)				/* Month = 1 */
			| ((DWORD)1 << 16)				/* Day_m = 1*/
			| ((DWORD)0 << 11)				/* Hour = 0 */
			| ((DWORD)0 << 5)				/* Min = 0 */
			| ((DWORD)0 >> 1);				/* Sec = 0 */
}

