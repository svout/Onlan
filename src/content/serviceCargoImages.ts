import imgAirService from '@images/cargo/air-service.webp';
import imgChinaImport from '@images/cargo/china-import.webp';
import imgConstruction from '@images/cargo/construction.webp';
import imgContainer from '@images/cargo/container.webp';
import imgCustomsService from '@images/cargo/customs-service.webp';
import imgEcommerce from '@images/cargo/ecommerce.webp';
import imgElectronics from '@images/cargo/electronics.webp';
import imgEquipment from '@images/cargo/equipment.webp';
import imgFurniture from '@images/cargo/furniture.webp';
import imgIndustrial from '@images/cargo/industrial.webp';
import imgLtl from '@images/cargo/ltl.webp';
import imgMachinery from '@images/cargo/machinery.webp';
import imgMarketplace from '@images/cargo/marketplace.webp';
import imgMetal from '@images/cargo/metal.webp';
import imgOversize from '@images/cargo/oversize.webp';
import imgOversizeService from '@images/cargo/oversize-service.webp';
import imgPallet from '@images/cargo/pallet.webp';
import imgParts from '@images/cargo/parts.webp';
import imgRailService from '@images/cargo/rail-service.webp';
import imgRefrigerated from '@images/cargo/refrigerated.webp';
import imgRetail from '@images/cargo/retail.webp';
import imgRoadService from '@images/cargo/road-service.webp';
import imgSamples from '@images/cargo/samples.webp';
import imgSeaService from '@images/cargo/sea-service.webp';
import imgTank from '@images/cargo/tank.webp';
import imgTextile from '@images/cargo/textile.webp';
import imgUrgent from '@images/cargo/urgent.webp';

export const SERVICE_CARGO_IMAGES: Record<string, string> = {
    'cargo-auto-furniture': imgFurniture,
    'cargo-auto-pallet': imgPallet,
    'cargo-auto-construction': imgConstruction,
    'cargo-auto-equipment': imgEquipment,
    'cargo-auto-reefer': imgRefrigerated,
    'cargo-auto-ltl': imgLtl,
    'cargo-auto-retail': imgRetail,

    'cargo-sea-furniture': imgChinaImport,
    'cargo-sea-electronics': imgElectronics,
    'cargo-sea-textile': imgTextile,
    'cargo-sea-marketplace': imgMarketplace,
    'cargo-sea-equipment': imgEquipment,
    'cargo-sea-industrial': imgIndustrial,
    'cargo-sea-bulk': imgSeaService,

    'cargo-air-electronics': imgElectronics,
    'cargo-air-valuable': imgUrgent,
    'cargo-air-urgent': imgAirService,
    'cargo-air-parts': imgParts,
    'cargo-air-samples': imgSamples,
    'cargo-air-small': imgPallet,

    'cargo-rail-industrial': imgIndustrial,
    'cargo-rail-construction': imgConstruction,
    'cargo-rail-equipment': imgEquipment,
    'cargo-rail-raw': imgMetal,
    'cargo-rail-bulk': imgContainer,
    'cargo-rail-china': imgRailService,

    'cargo-over-plant': imgMachinery,
    'cargo-over-build': imgConstruction,
    'cargo-over-metal': imgMetal,
    'cargo-over-tank': imgTank,
    'cargo-over-special': imgOversize,
    'cargo-over-heavy': imgOversizeService,

    'cargo-customs-china': imgChinaImport,
    'cargo-customs-electronics': imgElectronics,
    'cargo-customs-equipment': imgEquipment,
    'cargo-customs-furniture': imgFurniture,
    'cargo-customs-textile': imgTextile,
    'cargo-customs-industrial': imgCustomsService,

    'cargo-multi-bulk': imgContainer,
    'cargo-multi-china': imgChinaImport,
    'cargo-multi-equipment': imgEquipment,
    'cargo-multi-electronics': imgElectronics,
    'cargo-multi-furniture': imgFurniture,
    'cargo-multi-ecommerce': imgEcommerce,
};

export const SERVICE_CARGO_IMAGE_FALLBACK = imgRoadService;