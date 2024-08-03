/**
 * 顺序执行回调函数的队列类
 */
export class ExecuteSequentially {
  // 存储待执行回调函数的队列
  queue: Array<() => Promise<unknown>> = [];

  // 私有变量，表示当前是否有回调函数在执行
  #isRunning = false;

  /**
   * 将回调函数添加到队列中，并在当前没有执行中的回调时开始执行
   */
  push(callback: () => Promise<unknown>) {
    this.queue.push(callback);
    // 如果当前没有在执行中，则开始执行
    if (!this.#isRunning) {
      this.executeStart();
    }
  }

  /**
   * 执行队列中的下一个回调函数
   * @private
   */
  async _executeNext() {
    // 检查当前是否正在执行
    if (this.#isRunning) {
      // 等待当前回调函数的执行完成
      await this.queue[0]();
      // 从队列中移除已执行的回调函数
      this.queue.shift();
      // 如果队列为空，停止执行
      if (this.queue.length === 0) {
        this.#isRunning = false;
      } else {
        // 继续执行下一个回调函数
        this._executeNext();
      }
    }
  }

  /**
   * 开始执行队列中的回调函数
   */
  executeStart() {
    this.#isRunning = true;
    this._executeNext();
  }

  /**
   * 暂停执行队列中的回调函数
   */
  executePause() {
    this.#isRunning = false;
  }

  /**
   * 停止执行队列中的回调函数并清空队列
   */
  executeStop() {
    this.#isRunning = false;
    this.queue.length = 0;
  }
}
