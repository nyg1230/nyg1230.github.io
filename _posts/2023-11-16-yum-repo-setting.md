---
layout: board
title:  "Linux yum local repository 설정"
date:   2023-11-16 16:30:00 +0900
author: nope
category: ["linux", "repo", "rhel"]
thumbnail: "wsl.png"
---

### 목차
1. [개요](#개요)
1. [작업 환경](#작업-환경)
1. [설정 진행하기](#설정-진행하기)
	1. [iso 마운트](#iso-마운트)
	1. [iso 복사하기](#iso-복사하기)
	1. [repo 설정](#repo-설정)
		* [set rhel 8](#set-rhel-8)
		* [set rhel 7](#set-rhel-7)
	1. [repo 설정 확인](#repo-설정-확인)
		* [show rhel 8](#show-rhel-8)
		* [show rhel 7](#show-rhel-7)

-----

1. # 개요
	개발 테스트를 하면 대부분 리눅스 환경에서 진행하게 된다.
	폐쇄망 테스트를 위해 offline 환경을 설정해야되는 경우가 많다.
	그 중 rhel에서 local repository를 설정하게 되는 경우가 있었는데 기록을 남기기 위해 작성을 하게 되었다.

1. # 작업 환경
	```
	가상환경: hyper-v
	OS: rhel 8.6 (minimal) # 해당 글에서는 7버전 적용 방식도 같이 기입함

	이 외 준비물
	os 설치 과정에서 사용한 iso 파일
	```

1. # 설정 진행하기
	1. #### iso 마운트
		마운트 확인 여부를 위하여 장치 감지 관리 및 모니터 명령어를 사용
		```
		# 최초 명령어 사용 시
		$ udevadm monitor
		monitor will print the received events for:
		UDEV - the event which udev sends out after rule processing
		KERNEL - the kernel uevent

		# 마운트가 된 경우
		KERNEL	[1399.200048] change	/devices/pci0000:00/0000:00:07.1/ata2/host1/target1:0:0/1:0:0:0/block/sr0 (block)
		UDEV	[1399.200048] change	/devices/pci0000:00/0000:00:07.1/ata2/host1/target1:0:0/1:0:0:0/block/sr0 (block)
		```
		아래의 이미지와 같이 os 설치에 사용한 동일 iso 이미지 파일 가상 드라이브 추가
		![img](/assets/image/post/yum_repo/hyper-v-dvd.png)

		마운트가 된 것이 모니터에서 확인이 되었다면 아래의 명령어를 사용하여 마운트함
		```
		$ mount -o loop /dev/sr0 /media
		

		# 마운트 확인하기
		$ df -h /media
		Filesystem	Size	Used	Avail	Use%	Mounted on
		/dev/loop0	11G		11G		0		100%	/media
		```

	1. #### iso 복사하기
		마운트 된 iso 대상이 없이 로컬에서 repo 설정을 위해 iso 내부 모든 파일을 디렉토리에 복사함
		```
		# iso 내부 파일을 복사할 디렉토리를 생성함
		# 디렉토리의 경로 및 이름은 임의로 지정함
		$ mkdir /repo
		$ cp -a /media/* /repo/
		```

	1. #### repo 설정
		```
		# 임의의 파일명, repo 확장자를 가진 설정 파일을 /etc/yum.repos.d/ 하위에 추가함
		# 본 글에서는 **local** 이라는 파일명으로 사용함

		$ vi /etc/yum.repos.d/local.repo

		baseurl에 들어가는 경로 중 위 iso 복사한 대상의 디렉토리를 가져감
		```
		* #### set rhel 8
			```
			[BaseOS]
			name=BaseOS repo
			baseurl=file:///repo/BaseOS
			gpgcheck=0
			enabled=1
			[AppStream]
			name=AppStream repo
			baseurl=file:///repo/AppStream
			gpgcheck=0
			enabled=1
			```
		* #### set rhel 7
			```
			[Local]
			name=localrepo
			baseurl=file:///repo
			gpgcheck=0
			enabled=1
			```

	1. #### repo 설정 확인
		```
		$ yum repolist -v
		```
		* #### show rhel 8
			![img](/assets/image/post/yum_repo/rhel_8_yum_repolist.png)
		
		* #### show rhel 7
			* 차후 첨부
