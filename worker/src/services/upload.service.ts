interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

interface UploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
}

export class UploadService {
  private config: CloudinaryConfig;

  constructor(env: {
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
  }) {
    this.config = {
      cloudName: env.CLOUDINARY_CLOUD_NAME,
      apiKey: env.CLOUDINARY_API_KEY,
      apiSecret: env.CLOUDINARY_API_SECRET,
    };
  }

  private async generateSignature(paramsToSign: Record<string, string | number>): Promise<string> {
    const sorted = Object.keys(paramsToSign)
      .sort()
      .map((key) => `${key}=${paramsToSign[key]}`)
      .join("&");

    const data = new TextEncoder().encode(sorted + this.config.apiSecret);
    const hash = await crypto.subtle.digest("SHA-1", data);
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  async uploadImage(
    file: File,
    folder: string = "portfolio"
  ): Promise<UploadResult> {
    const timestamp = Math.floor(Date.now() / 1000);

    const paramsToSign: Record<string, string | number> = {
      folder,
      timestamp,
    };

    const signature = await this.generateSignature(paramsToSign);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", this.config.apiKey);
    formData.append("timestamp", String(timestamp));
    formData.append("signature", signature);
    formData.append("folder", folder);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${this.config.cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Cloudinary upload failed: ${error}`);
    }

    const data = (await response.json()) as {
      secure_url: string;
      public_id: string;
      width: number;
      height: number;
      format: string;
    };

    return {
      url: data.secure_url,
      publicId: data.public_id,
      width: data.width,
      height: data.height,
      format: data.format,
    };
  }

  async deleteImage(publicId: string): Promise<boolean> {
    const timestamp = Math.floor(Date.now() / 1000);

    const paramsToSign: Record<string, string | number> = {
      public_id: publicId,
      timestamp,
    };

    const signature = await this.generateSignature(paramsToSign);

    const formData = new FormData();
    formData.append("public_id", publicId);
    formData.append("api_key", this.config.apiKey);
    formData.append("timestamp", String(timestamp));
    formData.append("signature", signature);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${this.config.cloudName}/image/destroy`,
      {
        method: "POST",
        body: formData,
      }
    );

    return response.ok;
  }
}
