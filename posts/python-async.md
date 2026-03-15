# Python 异步编程入门

Python 的 `asyncio` 是处理 I/O 密集型任务的利器，理解它只需要掌握三个关键词。

## async def

用 `async def` 定义一个协程函数，调用它不会立即执行，而是返回一个协程对象。

## await

`await` 用于挂起当前协程，等待另一个协程完成，同时把控制权交还给事件循环。

## asyncio.run()

程序入口，负责创建事件循环并运行顶层协程。一个程序只需调用一次。

```python
import asyncio

async def hello():
    await asyncio.sleep(1)
    print("Hello, async!")

asyncio.run(hello())
```

> 异步不是多线程，它是单线程内的协作式调度。
