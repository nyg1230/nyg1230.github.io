---
layout: post
title:  "Canvas 및 JS를 활용한 차트 만들기"
date:   2023-07-08 15:17:00 +0900
author: nope
category: ["canvas", "chart", "js"]
thumbnail: "canvas_chart.png"
breadcrumb:
    - { title: Home, path: / }
    - { title: Category, path: / }
    - { title: post list, path: /category/postList.html }
---

### 목차
1. [Canvas](#canvas)
    1. [개요](#개요)
1. [Chart](#chart)
    1. [기본 구조](#기본-구조)
    1. [Animation](#animation)
    1. [Pie Chart](#pie-chart)
        1. [Pie Render](#pie-render)
        1. [Pie Tooltip](#pie-tooltip)
    1. [Bar Chart](#bar-chart)
        1. [Bar Render](#bar-render)
        1. [Bar Tooltip](#bar-tooltip)

-----

1. # Canvas
    1. #### 개요
        * 해당 사이트 메인 화면에 나타나는 파이 및 바차트에 대한 코드 설명
1. # Chart
    1. #### 기본 구조
        ``` js
        // Chart 상위 객체
        class Chart {
            ...

            // 최초 생성시 호출되는 함수
            // 데이터가 없을 경우 별도의 렌더링 과정은 거치지 않는다
            #init(data) {
                this.#initOption();
                if (util.CommonUtil.isNotEmpty(data)) {
                    this.setChartData(data);
                }
                this.#addObserver();
            }
        }

        /**
         * PieChart
         */
        class PieChart extends Chart {
            ...

            /**
             * useAnimation 애니메이션 사용여부
             * option 단발성으로 사용할 옵션
             */
            drawChart(useAnimation = true, option) {
                const fn = () => {
                    ...

                    /**
                     * 조건에 따라 requestAnimationFrame를 사용하여 재귀호출을 한다.
                     * 애니메이션을 사용하지 않는다면 단 1회만 fn 함수를 호출하게 된다.
                     */
                    if (condition) {
                        ...
                        window.cancelAnimationFrame(fn);
                    } else {
                        window.requestAnimationFrame(fn);
                    }
                }

                window.requestAnimationFrame(fn);
            }
        }
        ```
    1. #### Animation
        Canvas에 차트를 한번에 그려낼 수 있다.  
        하지만 단순히 그려내는 것은 무언가 심심하다는 것을 느끼게 되었다.  
        애니메이션을 적용하면 차트뿐만 아닌 사이트 자체에 역동성이 생길 것이라고 생각하였다.  
        Canvas에 애니메이션을 적용을 하기위해 아래와 같이 코드를 작성하여 그리는 과정에서 사용할 수 있도록 하였다.
        기본적이 개념은 누적 진행율 리스트를 반환하여 사용하였다.  

        ``` js
        /**
         * 현재 3가지의 방식을 구현하였다.
         * - 일정속도로
         * - 점점 빠르게
         * - 점점 느리게
         *
         * 모든 함수는 반복 횟수를 매개변수로 받아서 누적 진행율 리스트를 반환하게 작성하였다.
         *  tick    : 1회 진행당 증가할 값
         *  arr     : 반환할 누적 진행율 리스트
         */

        /**
         * 일정 속도
         * 전체 반복 횟수로 나누어 일정하게 증가하는 누적 증가율 리스트를 반환한다.
         * 기울기가 1인 1차 함수의 개념을 적용하였다.
         */
        constant(count = defualtValue) {
            const tick = Math.round(1 / count);
            const arr = [];

            for (let idx = 1; idx <= count; idx++) {
                const v = idx * tick;
                arr.push(v);
            }

            return arr;
        }

        constant(50);
        >>> [0.02, 0.04, 0.05, ..., 0.98, 1];

        /**
         * 점점 빠르게
         * 증가율이 점점 증가하여야 하므로 2차 함수의 개념을 적용하였다.
         */
        rapidly(count = defaultCount, corr = 5) {
            const tick = util.CommonUtil.round(1 / count, 12);
            const arr = [];
            for (let idx = 1; idx <= count; idx++) {
                const v = (idx * tick) ** corr;
                arr.push(v);
            }

            return arr;
        }

        /**
         * 점점 느리게
         * 증가율이 점점 감소하여야 하므로 로그 함수의 개념을 적용하였다.
         * 0부터 시작해야 하므로 1을 자연로그 e에서 1을 빼준 시점부터 시작 log 1 = 0 
         */
        slowly(count = defaultCount, corr = 1 / 5) {
            const tick = util.CommonUtil.round((Math.E - 1) / count, 12);
            const arr = [];
            for (let idx = 1; idx <= count; idx++) {
                const v = Math.log(idx * tick + 1) ** corr;
                arr.push(v);
            }

            return arr;
        }
        ```
    
    1. #### Pie Chart
        1. ##### Pie Render

            ``` js
            /**
             * 전달 받은 데이터를 파이 차트를 그릴 수 있게 파싱을 진행한다.
             * 파싱 전후 데이터는 아래와 같다
             */
            const preData = {
                data: {
                    { name: "amy", value: 200 },
                    { name: "ban", value: 1500 },
                    { name: "charly", value: 800 },
                    { name: "deny", value: 1234 },
                    { name: "emma", value: 1000 },
                },
                option: {}
            };

            /**
             * 파싱된 데이터는 아래와 같다.
             * 각 데이터마다 아래와 같은 정보를 포함한다.
             *  데이터 비율
             *  시작 종료 radian
             *  시작 종료 degree
             */
            const parseData = {
                total: 4734,
                data: [
                    {
                        name: "ban",
                        value: 1500,
                        ratio: 0.31686,
                        st: -1.5707963267948966,
                        ag: 1.9908900964329235,
                        degree: {
                            st: 0,
                            ed: 114.06959999999998
                        },
                        index: 0
                    },
                    ...
                    {
                        name: "amy",
                        value: 200,
                        ratio: 0.04225,
                        st: 4.446987233009424,
                        ag: 0.26546457922833755,
                        degree: {
                            st: 344.79359999999997,
                            ed: 360.0036
                        },
                        index: 4
                    }
                ]
            }
            ```

            ``` js
            /**
             * 위와 같이 파싱된 데이터를 기반으로 fn 함수를 정의한다.
             */

            drawChart(useAnimation = true, option) {
                // 단발성 옵션
                option = util.CommonUtil.shallowMerge(option, this.option);

                // 사전에 필요한 데이터 선언
                const { data } = { ...this.chartData };
                const { pie, label, animation: { type, speed } } = { ...option };
                const scale = util.CommonUtil.find(this.option, "chart.scale", 0.9);
                const { all: commonPieOption } = { ...pie };

                // 위에서 정의한 누적 진행율 반환 함수
                const animation = util.AnimationUtil.getAnimation(type, speed, useAnimation);

                const canvasRect = util.StyleUtil.getBoundingClientRect(this.builder.canvas);
                const { width, height } = canvasRect;
                const _width = width;
                let size = _width > height ? height : _width;
                size = size / 2 * scale;
                const point = [_width / 2, height / 2];

                const fn = () => {
                    this.clear();
                    const progressRate = animation.shift();

                    data.forEach((d, idx) => {
                        const { st, ag } = { ...d };
                        const _pieOption = util.CommonUtil.find(pie, `${idx}`);
                        const { mag = 1, ...pieOption } = { ..._pieOption };
                        const opt = { ...commonPieOption, ...pieOption };
                        this.builder.arc(point, size * mag, [st, st + ag * progressRate], "fill", { style: { fillStyle: color[idx], ...opt } });
                    });

                    if (util.CommonUtil.isEmpty(animation)) {
                        const [x, y] = [...point];
                        this.#info = { x: x, y: y, r: size };
                        this.drawDataLabel(data, label);
                        window.cancelAnimationFrame(fn);
                    } else {
                        window.requestAnimationFrame(fn);
                    }
                }

                window.requestAnimationFrame(fn);
            }
            ```

        1. ##### Pie Tooltip
            파이 내부에 마우스가 올라갔는지 여부를 먼저 확인 후 그에 맞는 html을 반환한다.  
            일반적으로 x^2 + y^2 <= r^2을 이용하여 조건을 구하면 되나  
            MouseMove시 매번 이벤트 호출이 발생할 때 연산을 진행해야 하므로 아래와 같이 사전 분기 처리를 추가하였다.  

            ``` js
            /**
             * 흐름
             * - 마우스 이벤트 발생
             * - 커서가 파이 내부에 있는지 확인
             * - true이면 커서 위치와 중심 좌표의 각도를 구하여 해당 위치의 데이터를 찾음
             * - 파이 조각 데이터를 기반으로 툴팁 html 생성 후 반환
             */

            /**
             * 매개 변수로 현재 마우스 커서의 x, y 좌표를 받는다.
             */
            checkInPie(x, y) {
                // 파이를 그를 때 사용한 중심 좌표를 가져온다.
                const { x: rx, y: ry, r } = { ...this.#info };
                
                const gapX = Math.abs(x - rx);
                const gapY = Math.abs(y - ry);

                let result = false;
                if (gapX + gapY <= r) {
                    result = true;
                } else if (gapX > r || gapY > r) {
                } else if (gapX ** 2 + gapY ** 2 <= r ** 2) {
                    result = true;
                }

                return result;
            }
            ```
    
    1. #### Bar Chart
        1. ##### Bar Redner

            ``` js
            /**
             * 전달 받은 데이터를 파이 차트를 그릴 수 있게 파싱을 진행한다.
             * 파싱 전후 데이터는 아래와 같다
             */
            const preData = {
                data: {
                    { name: "amy", value: 200 },
                    { name: "ban", value: 1500 },
                    { name: "charly", value: 800 },
                    { name: "deny", value: 1234 },
                    { name: "emma", value: 1000 },
                },
                option: {}
            };
            ```
        1. ##### Bar Tooltip