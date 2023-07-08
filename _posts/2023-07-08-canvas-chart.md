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
    1. [Bar Chart](#bar-chart)

-----

1. # Canvas
    1. #### 개요
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
        slowly(count = defaultCount, corr = 1 / 5) {
            const tick = util.CommonUtil.round((Math.E - 1) / count, 12);
            const arr = [];
            for (let idx = 1; idx <= count; idx++) {
                const v = Math.log(idx * tick + 1) ** corr;
                arr.push(v);
            }

            return arr;
        }

        /**
         * 점점 느리게
         * 증가율이 점점 감소하여야 하므로 로그 함수의 개념을 적용하였다.
         */
        ```