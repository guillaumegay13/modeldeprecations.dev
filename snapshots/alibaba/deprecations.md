To optimize resources and provide users with the latest, most advanced models, Alibaba Cloud Model Studio periodically retires legacy models. This topic describes the model retirement process.

## **Notification process**

### **Notification schedule**

- For **snapshot** models, which are identified by a specific date in their name (for example, qwen-max-2025-01-25, common for Qwen series models), we issue a sunset notice **30 days before** the official sunset date.
- For **mainline** models, which are the core versions of a model series, we issue a sunset notice **3 months before** the official sunset date.

### **Notification channels**

We send notifications via email, internal messages, and official website announcements.

> email, and internal messages are sent only to users who have called the models scheduled for sunset in the last 3 months.

## Retirement impact

- **Starting from the date of the retirement notice**, the QPM (queries per minute) and TPM (tokens per minute) for retiring models will gradually decrease. For models that received a quota increase, their limits will revert to the [default rate limit](/help/en/model-studio/rate-limit) before this reduction begins. Throughout this period, the model API and related console features will remain fully functional.
- **Starting from the official retirement date**:

  - **Model inference**: Model inference will be discontinued. API calls to the retired model will fail.
  - **Model fine-tuning and model deployment**: You will no longer be able to start new fine-tuning and deployment operations on the retired model. (For some models, these features may remain available after the retirement date. Please refer to the official retirement notice for details.) This does not affect existing trained and deployed models.
  - **Console features and official documentation**: Associated console features (such as Model Square and Model Discovery) and the official documentation will also be retired.

## Actions

1. Go to the Singapore region's [Model Observation](https://modelstudio.console.alibabacloud.com/?tab=dashboard#/model-telemetry) page to check if your account is using any models scheduled for sunset.
> To use models in the China (Beijing) region, go to the China (Beijing) region's [Model Observation](https://bailian.console.alibabacloud.com/?tab=model#/model-telemetry) page.
2. If you use an affected model, test the replacement model's business performance before switching to it.

## Deprecated models

### **Scheduled for deprecation on October 10, 2026**

For more details, see the official announcement [\[Model Studio\] Notice: Deprecation of Some Historical Mainline Models](https://www.alibabacloud.com/zh/notice/detail?%5Fp%5Flc=1&id=1950).

| **Category**      | **Model name**      | **Deprecation time**       | **Replacement model** |
| ----------------- | ------------------- | -------------------------- | --------------------- |
| Qwen-Max          | qwen3.6-max-preview | October 10, 2026, 00:00:00 | qwen3.7-max           |
| qwen3-max-preview |                     |                            |                       |
| qwen3-max         |                     |                            |                       |
| Qwen-VL           | qwen3-vl-flash      | qwen3.6-flash              |                       |
| Qwen-Coder        | qwen3-coder-plus    | qwen3.7-plus               |                       |

### **Scheduled for deprecation on October 10, 2026**

For more details, see the official announcement [\[Model Studio\] Notice: Deprecation of Some Historical Snapshot Models](https://www.alibabacloud.com/zh/notice/detail?%5Fp%5Flc=1&id=1949).

| **Category**                   | **Model name**              | **Deprecation time**       | **Replacement model** |
| ------------------------------ | --------------------------- | -------------------------- | --------------------- |
| Qwen-Max                       | qwen3-max-2026-01-23        | October 10, 2026, 00:00:00 | qwen3.7-max           |
| qwen3-max-2025-09-23           |                             |                            |                       |
| Qwen-VL                        | qwen3-vl-8b-instruct        | qwen3.6-flash              |                       |
| qwen3-vl-8b-thinking           |                             |                            |                       |
| qwen3-vl-flash-2026-01-22      |                             |                            |                       |
| qwen3-vl-flash-2025-10-15      |                             |                            |                       |
| qwen3-vl-30b-a3b-instruct      | qwen3.7-plus                |                            |                       |
| qwen3-vl-30b-a3b-thinking      |                             |                            |                       |
| qwen3-vl-32b-instruct          |                             |                            |                       |
| qwen3-vl-32b-thinking          |                             |                            |                       |
| qwen3-vl-235b-a22b-thinking    |                             |                            |                       |
| Qwen-Coder                     | qwen3-coder-next            | qwen3.7-plus               |                       |
| qwen3-coder-30b-a3b-instruct   |                             |                            |                       |
| qwen3-coder-plus-2025-09-23    |                             |                            |                       |
| qwen3-coder-plus-2025-07-22    |                             |                            |                       |
| qwen3-coder-480b-a35b-instruct |                             |                            |                       |
| Qwen3 open source edition      | qwen3-8b                    | qwen3.6-flash              |                       |
| qwen3-14b                      |                             |                            |                       |
| qwen3-30b-a3b                  | qwen3.7-plus                |                            |                       |
| qwen3-30b-a3b-instruct-2507    |                             |                            |                       |
| qwen3-30b-a3b-thinking-2507    |                             |                            |                       |
| qwen3-32b                      |                             |                            |                       |
| qwen3-235b-a22b                |                             |                            |                       |
| qwen3-vl-235b-a22b-instruct    |                             |                            |                       |
| qwen3-235b-a22b-instruct-2507  |                             |                            |                       |
| qwen3-235b-a22b-thinking-2507  |                             |                            |                       |
| qwen3-next-80b-a3b-instruct    |                             |                            |                       |
| qwen3-next-80b-a3b-thinking    |                             |                            |                       |
| third-party model              | deepseek-r1-distill-qwen-7b | qwen3.7-plus               |                       |
| deepseek-r1-distill-qwen-14b   |                             |                            |                       |
| deepseek-r1-distill-qwen-32b   |                             |                            |                       |
| deepseek-v3                    |                             |                            |                       |
| deepseek-v3.1                  |                             |                            |                       |
| deepseek-v3.2                  |                             |                            |                       |
| deepseek-v3.2-exp              |                             |                            |                       |
| deepseek-r1                    |                             |                            |                       |
| deepseek-r1-0528               |                             |                            |                       |
| MiniMax-M2.1                   |                             |                            |                       |
| glm-4.7                        |                             |                            |                       |
| glm-4.6                        |                             |                            |                       |
| Moonshot-Kimi-K2-Instruct      |                             |                            |                       |
| kimi-k2-thinking               |                             |                            |                       |

### **Retires on May 30, 2026**

For details, see the official announcement [Notice on the Sunset of the GTE-RERANK model](https://www.aliyun.com/notice/118217).

| **Category** | **Model name** | **Deprecation time**   | **Replacement model** |
| ------------ | -------------- | ---------------------- | --------------------- |
| rerank       | gte-rerank     | May 30, 2026, 00:00:00 | qwen3-rerank          |

### **Deprecated on January 30, 2026**

| **Category**            | **Model name**            | **Deprecation time**       | **Replacement model** |
| ----------------------- | ------------------------- | -------------------------- | --------------------- |
| Qwen-Plus               | qwen-plus-2024-11-27      | January 30, 2026, 00:00:00 | qwen-plus-2025-12-01  |
| qwen-plus-2024-11-25    |                           |                            |                       |
| qwen-plus-2024-09-19    |                           |                            |                       |
| qwen-plus-2024-08-06    |                           |                            |                       |
| Qwen-Turbo              | qwen-turbo-2024-09-19     | qwen-flash-2025-07-28      |                       |
| Qwen-VL                 | qwen-vl-max-2024-10-30    | qwen3-vl-plus-2025-12-19   |                       |
| qwen-vl-max-2024-08-09  |                           |                            |                       |
| qwen-vl-plus-2024-08-09 | qwen3-vl-flash-2025-10-15 |                            |                       |

### **Deprecated on August 20, 2025**

| **Category**                                 | **Model name**     | **Deprecation time**                  | **Replacement model** |
| -------------------------------------------- | ------------------ | ------------------------------------- | --------------------- |
| text generation - Qwen - open source edition | qwen2-72b-instruct | August 20, 2025, 00:00:00 (UTC+08:00) | qwen-plus             |
| qwen2-57b-a14b-instruct                      |                    |                                       |                       |
| qwen2-7b-instruct                            |                    |                                       |                       |
| qwen1.5-110b-chat                            |                    |                                       |                       |
| qwen1.5-72b-chat                             |                    |                                       |                       |
| qwen1.5-32b-chat                             |                    |                                       |                       |
| qwen1.5-14b-chat                             |                    |                                       |                       |
| qwen1.5-7b-chat                              |                    |                                       |                       |
