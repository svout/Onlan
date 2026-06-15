import imgAirService from '@images/cargo/air-service.jpg';
import imgChinaImport from '@images/cargo/china-import.jpg';
import imgConstruction from '@images/cargo/construction.jpg';
import imgContainer from '@images/cargo/container.jpg';
import imgCustomsService from '@images/cargo/customs-service.jpg';
import imgEcommerce from '@images/cargo/ecommerce.jpg';
import imgElectronics from '@images/cargo/electronics.jpg';
import imgEquipment from '@images/cargo/equipment.jpg';
import imgFurniture from '@images/cargo/furniture.jpg';
import imgIndustrial from '@images/cargo/industrial.jpg';
import imgLtl from '@images/cargo/ltl.jpg';
import imgMachinery from '@images/cargo/machinery.jpg';
import imgMarketplace from '@images/cargo/marketplace.jpg';
import imgMetal from '@images/cargo/metal.jpg';
import imgOversize from '@images/cargo/oversize.jpg';
import imgOversizeService from '@images/cargo/oversize-service.jpg';
import imgPallet from '@images/cargo/pallet.jpg';
import imgParts from '@images/cargo/parts.jpg';
import imgRailService from '@images/cargo/rail-service.jpg';
import imgRefrigerated from '@images/cargo/refrigerated.jpg';
import imgRetail from '@images/cargo/retail.jpg';
import imgRoadService from '@images/cargo/road-service.jpg';
import imgSamples from '@images/cargo/samples.jpg';
import imgSeaService from '@images/cargo/sea-service.jpg';
import imgTank from '@images/cargo/tank.jpg';
import imgTextile from '@images/cargo/textile.jpg';
import imgUrgent from '@images/cargo/urgent.jpg';

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