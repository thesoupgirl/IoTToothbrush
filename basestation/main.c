/*----------------------------------------------------------------------*/
/* FatFs sample project for generic microcontrollers (C)ChaN, 2012      */
/*----------------------------------------------------------------------*/

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include "ff.h"

#define 	ReadBrushConnection()			bcm2835_gpio_lev(RPI_GPIO_P1_24)


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


/*-----------------------------------------------------------------------*/
/* Program Main                                                          */
/*-----------------------------------------------------------------------*/

int u32flag;
int main (void)
{
	//Setup input pin
	bcm2835_gpio_fsel(RPI_GPIO_P1_24, BCM2835_GPIO_FSEL_INPT); // Connection

	while(true)
	{
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

void InitializeSD()
{
	FRESULT rc;				/* Result code */
	DIR dir;				/* Directory object */
	FILINFO fno;			/* File information object */
	UINT bw, br, u32i, u32j;
	UINT u32val[3]={121, 253, 199};
    char unitval, tensval, hundredval;
    int fileNum = 1;
    char fileName[5];

	f_mount(0, &Fatfs);		/* Register volume work area (never fails) */

    while(true)
    {
		printf("\nOpening data file %d\n", fileNum);
		itoa(fileNum, fileName, 10);
		rc = f_open(&Fil, fileName, FA_READ);
		if (rc) die(rc);

		printf("\nType the file content.\n");
		for (;;) {
			rc = f_read(&Fil, Buff, sizeof Buff, &br);	/* Read a chunk of file */
			if (rc || !br) break;			/* Error or end of file */
			for (i = 0; i < br; i++)		/* Type the data */
				putchar(Buff[i]);
		}
		if (rc) die(rc);

		printf("\nClose the file.\n");
		rc = f_close(&Fil);
		if (rc) die(rc);
		fileNum++;
    }

	printf("\nTest completed.\n");

	return 0;
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

